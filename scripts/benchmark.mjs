import {readFileSync} from 'node:fs';
import {performance} from 'node:perf_hooks';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {analyze,createAnalyzer} from '../src/analyze.mjs';
const fixture=readFileSync(new URL('../fixtures/npm-relative.md',import.meta.url),'utf8');
const holdout=readFileSync(new URL('../fixtures/holdout.md',import.meta.url),'utf8');
const cached=createAnalyzer();
for(const s of [fixture,holdout,fixture+'\n![Changed](other.svg)']) {assert.deepEqual(cached(s),analyze(s));assert.deepEqual(cached(s),analyze(s));}
for(const files of [[],['docs/media/hero.jpg']])assert.deepEqual(cached(fixture,{files}),analyze(fixture,{files}));
const measure=fn=>{const start=performance.now();for(let i=0;i<1000;i++)fn(fixture);return performance.now()-start;};
const baseline=[],candidate=[];
for(let i=0;i<10;i++){if(i%2){candidate.push(measure(cached));baseline.push(measure(analyze));}else{baseline.push(measure(analyze));candidate.push(measure(cached));}}
const mean=s=>s.reduce((a,b)=>a+b,0)/s.length;
console.log(JSON.stringify({schemaVersion:1,workload:'1000 repeated identical README analyses; caching experiment only, not algorithmic improvement',fixtureSha256:createHash('sha256').update(fixture).digest('hex'),holdoutEquality:true,baseline:{samples:baseline,mean:mean(baseline)},candidate:{samples:candidate,mean:mean(candidate)},improvementPercent:(mean(baseline)-mean(candidate))/mean(baseline)*100},null,2));
