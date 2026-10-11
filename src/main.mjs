#!/usr/bin/env node
import { main as analyzeMain } from './cli.mjs';
import {createServer} from 'node:http';
import {readFile,open} from 'node:fs/promises';
import {constants,realpathSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname,resolve} from 'node:path';
const here=dirname(fileURLToPath(import.meta.url));
const root=resolve(here,'..');
async function bounded(path) {
 const handle=await open(path,constants.O_RDONLY|constants.O_NOFOLLOW|constants.O_NONBLOCK);
 try{const stat=await handle.stat();if(!stat.isFile()||stat.size>1048576)throw Error('Invalid bounded report');const buffer=Buffer.alloc(1048577);let size=0;while(size<buffer.length){const {bytesRead}=await handle.read(buffer,size,buffer.length-size,null);if(!bytesRead)break;size+=bytesRead;}if(size>1048576)throw Error('Report too large');return buffer.subarray(0,size).toString('utf8');}finally{await handle.close();}
}
export async function main(args=process.argv.slice(2)) {
 const [command,...rest]=args;
 if(command==='mcp'){if(rest.length)throw Error('MCP takes no arguments');const module=await import('./mcp.mjs');if(typeof module.startMcp==='function')await module.startMcp();else if(typeof module.main==='function')await module.main();return 0;}
 if(command==='ui'){
   if(rest.length)throw Error('UI takes no arguments');
   const routes=new Map([['/',['ui/index.html','text/html']],['/index.html',['ui/index.html','text/html']],['/style.css',['ui/style.css','text/css']],['/app.mjs',['ui/app.mjs','text/javascript']],['/src/analyze.mjs',['src/analyze.mjs','text/javascript']],['/docs/media/introduction.svg',['docs/media/introduction.svg','image/svg+xml']],['/docs/media/workflow.svg',['docs/media/workflow.svg','image/svg+xml']]]);
   const server=createServer(async(req,res)=>{
     if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
     const route=routes.get(req.url);if(!route){res.writeHead(404);res.end();return;}
     try{const bytes=await readFile(resolve(root,route[0]));res.writeHead(200,{'Content-Type':route[1]+'; charset=utf-8','Content-Length':bytes.length,'X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'none'; frame-ancestors 'none'",'Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:bytes);}catch{res.writeHead(500);res.end();}
   });
   await new Promise((done,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',done);});
   console.log(`README Proof UI: http://127.0.0.1:${server.address().port}/`);return 0;
 }
 if(command==='rvf'){
   if(rest.length!==2)throw Error('Usage: rvf REPORT.json OUT.rvf');
   const report=JSON.parse(await bounded(rest[0]));
   const {createReceipt,exportRvf}=await import('./evidence.mjs');
   const receipt=createReceipt(report,'');
   const output=await exportRvf(receipt,rest[1]);
   console.log(JSON.stringify({...output,inputScope:'report-only',markdownBinding:'empty string; source README not supplied'}));return 0;
 }
 if(command==='rvf-read'){if(rest.length!==1)throw Error('Usage: rvf-read FILE.rvf');const {readRvf}=await import('./evidence.mjs');console.log(JSON.stringify(await readRvf(rest[0]),null,2));return 0;}
 if(!command||command==='--help'){console.log('readme-proof analyze|tui|plan README [options]\nreadme-proof ui\nreadme-proof mcp\nreadme-proof rvf REPORT.json OUT.rvf\nreadme-proof rvf-read FILE.rvf\nStatic checks only. No README command execution.');return 0;}
 return analyzeMain(args);
}
let direct=false;try{direct=!!process.argv[1]&&realpathSync(process.argv[1])===fileURLToPath(import.meta.url);}catch{}
if(direct)main().then(code=>{process.exitCode=code;}).catch(()=>{console.error('readme-proof failed: invalid input or unavailable operation.');process.exitCode=2;});
