# ADR 0001: Start with deterministic README evidence

Date: 2026-10-11
Status: accepted for the initial static analyzer scope

## Evidence and product decision

On October 11, the Hacker News front page showed “I paid people to try and follow my README” at number one with 262 points and 134 comments in a retrieval snapshot. The original author describes approximately €150 spent on real usability sessions that identified bad links, implicit prerequisites and confusing instructions. This is attention and problem evidence, not proof of demand for this specific product or a guarantee of viral adoption.

Sources: [HN](https://news.ycombinator.com/) and [original first person report](https://shkspr.mobi/blog/2026/10/i-paid-people-to-try-and-follow-my-readme/). Scores change; preserve the snapshot date when citing them. A later machine captured sweep at 17:47:29.593 UTC recorded 278 points and 143 comments; see [the preserved discovery evidence](../discovery.md).

Build a small local analyzer with shared CLI, browser and MCP surfaces. Return explicit findings and command risk annotations. Generate a verification plan without executing arbitrary Markdown. This bounds the initial attack surface and allows deterministic regression tests. Package evidence for reuse through the ruvnet ecosystem without equating a hash or an RVF container with correctness.

## Alternatives and limits

An autonomous clean machine installer would test a broader claim but adds shell execution, network access, dependency lifecycle scripts and platform variance. Defer it until a separately reviewed isolation adapter and execution policy exist. An LLM README reviewer can offer useful prose feedback, but its opinions cannot replace reproducible mechanical findings.

Static analysis can miss runtime failures, ambiguous language, unsupported Markdown constructs and platform differences. A passing report means no implemented rule found a problem. It does not certify security, completeness or usability. Human tests and an actual clean installation remain necessary for those claims.

## Acceptance

Detect declared malformed fixtures, avoid executing their payloads, render hostile text safely in the browser, and produce the same structured findings through CLI and MCP. Publish measured results only after tests actually run.
