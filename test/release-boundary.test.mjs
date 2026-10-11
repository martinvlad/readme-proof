import test from 'node:test';
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
const cwd=fileURLToPath(new URL('..',import.meta.url));
for(const expression of ["'['.repeat(250000)","'<img '.repeat(30000)"]){
 test(`malformed delimiter input finishes within bounded CPU: ${expression}`,()=>{
  const child=spawnSync(process.execPath,['--input-type=module','-e',`import {analyze} from './src/analyze.mjs'; analyze(${expression});`],{cwd,timeout:2000,encoding:'utf8'});
  assert.equal(child.error,undefined,`Analyzer timed out: ${child.error?.code}`);
  assert.equal(child.status,0,child.stderr);
 });
}
