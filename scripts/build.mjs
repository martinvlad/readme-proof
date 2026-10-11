import {build} from 'esbuild';
import {readFile,mkdir,copyFile,cp,writeFile,rm,chmod} from 'node:fs/promises';
import {resolve} from 'node:path';
const root=resolve(new URL('..',import.meta.url).pathname);
const dist=resolve(root,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
// Bundled imports share import.meta.url with the entrypoint. Disable only the
// imported legacy CLI's direct-execution guard; main owns execution dispatch.
const guards={name:'cli-import-guard',setup(b){b.onLoad({filter:/\/src\/cli\.mjs$/},async args=>({contents:(await readFile(args.path,'utf8')).replace('if(direct){','if(false && direct){'),loader:'js'}));}};
await build({entryPoints:[resolve(root,'src/main.mjs'),resolve(root,'src/mcp.mjs')],outdir:dist,outExtension:{'.js':'.mjs'},bundle:true,platform:'node',format:'esm',target:'node20',packages:'bundle',plugins:[guards],banner:{js:"import { createRequire as __createRequire } from 'node:module'; const require = __createRequire(import.meta.url);"}});
await copyFile(resolve(root,'node_modules/@ruvector/rvf-wasm/pkg/rvf_wasm_bg.wasm'),resolve(dist,'rvf_wasm_bg.wasm'));
await chmod(resolve(dist,'main.mjs'),0o755);
const stage=resolve(root,'publish-stage');await rm(stage,{recursive:true,force:true});await mkdir(stage,{recursive:true});
for(const name of ['dist','ui','docs','skills','mcp.json','plugin.json','manifest.ruv','README.md','LICENSE','SECURITY.md']){
 try{await cp(resolve(root,name),resolve(stage,name),{recursive:true,errorOnExist:true});}catch(error){if(error.code!=='ENOENT')throw error;}
}
await mkdir(resolve(stage,'src'),{recursive:true});await copyFile(resolve(root,'src/analyze.mjs'),resolve(stage,'src/analyze.mjs'));
const source=JSON.parse(await readFile(resolve(root,'package.json'),'utf8'));
const {scripts,devDependencies,dependencies,...manifest}=source;
await writeFile(resolve(stage,'package.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Built bundled CLIs, WASM and dependency-free publish-stage.');
