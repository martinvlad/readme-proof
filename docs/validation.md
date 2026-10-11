# Captured validation

## Local cache experiment, October 11, 2026

Command: `npm run benchmark`. The [raw output](evidence/benchmark-2026-10-11.json) preserves all ten samples for each variant from this run. Times are milliseconds per batch of 1,000 identical README analyses.

| Variant | Mean batch time |
| --- | ---: |
| Uncached analyzer | 16.6375 ms |
| Cached analyzer | 14.8095 ms |

The measured reduction in mean time was 10.9872%. Runs alternate baseline and candidate ordering. The script checks cached and uncached equality against a held out fixture, changed input and alternate file inventories. All those equality checks passed in this run.

This is a memoization experiment with identical repeated inputs, not an improvement to the underlying analysis algorithm. Individual samples vary substantially. There is no confidence interval, production corpus coverage estimate, independent replication or claim of SOTA. Browser interaction performance and network startup are not measured. Rerun on the deployment machine rather than using these figures as an SLA.

## Scope of integrations

The evidence module uses the actual RVF WASM package. Its digest vector is an integrity key, not a semantic embedding. Both the RVF binary and mandatory receipt sidecar must travel together. Hash consistency does not prove authorship or that a report is correct. Report-only CLI exports use an empty Markdown input; original document binding requires a receipt created with the actual Markdown.

The evolution module uses MetaHarness Pareto comparison against supplied metrics and requires matched dataset hashes and sample counts. Its output is a proposal, never release authority. It cannot independently authenticate caller supplied scores. Autogenous is represented as a contract, and the RVM adapter remains a deployment proposal.

## UI and plugin checks

JavaScript syntax, JSON manifest parsing and the skill validator passed during authoring. Browser runtime validation was initially blocked because the local Playwright Chromium executable was unavailable. Until a later recorded browser run exists, do not infer a visual or end to end browser pass from static checks. Plugin manifests are source distributions; actual Claude and Codex installation must be checked in those hosts.
