import { paretoFront } from '@metaharness/darwin';
/** Deterministic measured proposal comparison. Does not execute, merge, publish, or promote. */
export function evaluateCandidate(baseline, candidate) {
  for (const item of [baseline, candidate]) {
    if (!item || typeof item.id !== 'string' || !item.id || typeof item.datasetSha256 !== 'string' || !/^[a-f0-9]{64}$/.test(item.datasetSha256)) throw new Error('Evaluation provenance required');
    for (const key of ['accuracy', 'latencyMs', 'costUsd', 'safety']) if (!Number.isFinite(item[key]) || item[key] < 0) throw new Error('Invalid metric: ' + key);
    if (item.accuracy > 1 || item.safety > 1 || !Number.isInteger(item.regressions) || item.regressions < 0 || !Number.isInteger(item.samples) || item.samples < 1) throw new Error('Invalid evaluation');
  }
  if (baseline.datasetSha256 !== candidate.datasetSha256 || baseline.samples !== candidate.samples || baseline.id === candidate.id) throw new Error('Matched distinct evaluations required');
  const front = paretoFront([baseline, candidate], x => [x.accuracy, -x.latencyMs, -x.costUsd, x.safety]);
  const noRegression = candidate.regressions === 0 && candidate.accuracy >= baseline.accuracy && candidate.safety >= baseline.safety;
  const dominates = front.length === 1 && front[0] === candidate;
  return {
    schema: 'readme-proof/evolution/v1', backend: '@metaharness/darwin@0.10.3:paretoFront',
    baseline: baseline.id, candidate: candidate.id, datasetSha256: baseline.datasetSha256, samples: baseline.samples,
    eligible: dominates && noRegression && candidate.safety >= 0.95,
    checks: { dominates, noRegression, safetyFloor: candidate.safety >= 0.95 },
    paretoFront: front.map(x => x.id), action: 'proposal-only',
    autogenous: { mode: 'contract-only', runtimeExecuted: false, required: ['beatsParent', 'safety>=0.95', 'noRegression'], promotionAuthority: false },
  };
}
