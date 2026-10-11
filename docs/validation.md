# Captured validation

## Historical local cache experiment, October 11, 2026

This capture predates subsequent parser hardening. It is not a benchmark of the final published source revision.

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

JavaScript syntax, JSON manifest parsing and the skill validator passed during authoring. A later local Chromium download succeeded, but startup was blocked by socket permissions. Remote browser validation is still pending. Do not infer a visual or end to end browser pass from static checks. Plugin manifests are source distributions; actual Claude and Codex installation must be checked in those hosts.

## Published prerelease verification

Version `0.1.0-next.0` was published from source commit `9c50765e66acb06151239b6041ebf37f24694b18`. The release validation recorded 16 passing tests, including malformed parser input and FIFO handling regressions following independent review. Registry installation passed on Node.js 20 in ruOS and Node.js 24 locally. Both public README SVG URLs returned HTTP 200 with `image/svg+xml`.

See the [release receipt](release-2026-10-11.md) for exact artifact hashes and public links. These checks establish the reported package installation and artifact results, not arbitrary downstream platform compatibility or a browser interaction pass.

## Published browser and CI verification

The registry-installed 0.1.0-next.0 UI was exercised in Chromium on the Software Factory ruOS desktop on October 11, 2026. The built-in example returned one error, one warning and two commands for npm. Switching to GitHub removed the npm image error and retained the command warning. Actual screen capture and screenshots are attached to the GitHub release. This validates those interactions, not every browser or accessibility scenario.

GitHub Actions run [38162204202](https://github.com/ruvnet/readme-proof/actions/runs/38162204202) passed Node 20, 22 and 24 package validation. Independent verification of the registry-installed package passed real MCP tool/resource roundtrip and genuine RVF export/reopen. Claude/Codex host installation remains unverified.
