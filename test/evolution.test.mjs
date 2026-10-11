import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateCandidate } from '../src/evolution.mjs';
const base = { id:'base', datasetSha256:'a'.repeat(64), samples:20, accuracy:0.9, safety:1, latencyMs:20, costUsd:0, regressions:0 };
test('real Darwin Pareto gate accepts dominating proposal but never promotes', () => {
 const r = evaluateCandidate(base, {...base,id:'candidate',latencyMs:10});
 assert.equal(r.eligible,true); assert.equal(r.action,'proposal-only'); assert.equal(r.autogenous.runtimeExecuted,false);
});
test('reject regression, unsafe, unequal data and missing evidence', () => {
 assert.equal(evaluateCandidate(base,{...base,id:'c',accuracy:0.8,latencyMs:10}).eligible,false);
 assert.equal(evaluateCandidate(base,{...base,id:'c',latencyMs:10,regressions:1}).eligible,false);
 assert.throws(()=>evaluateCandidate(base,{...base,id:'c',datasetSha256:'b'.repeat(64)}));
 assert.throws(()=>evaluateCandidate(base,{...base,id:'c',latencyMs:NaN}));
});
