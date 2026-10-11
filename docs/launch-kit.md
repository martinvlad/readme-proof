# Product Hunt launch kit

Status: a Product Hunt draft was created on October 11, 2026. It is not scheduled for launch. The user explicitly instructed that it remain a draft. No launch, voting or external promotional messages occurred. Draft: https://www.producthunt.com/products/readme-proof?launch=readme-proof

## Product name

README Proof

## Tagline

Catch README portability problems before your users do

## Description

README Proof checks Markdown for publication issues and risky command patterns, then produces clear findings with source line numbers. Use it through a CLI, browser or MCP host. Analysis runs locally and never executes commands found in your README. Export structured evidence and prepare a separate verification plan before testing an installation.

## Maker first comment draft

I built README Proof after reading a developer's account of paying real people to follow an installation guide. Broken links and missing assumptions are expensive first impressions.

The initial release focuses on mechanical checks that can be reproduced. It shares one analyzer across the CLI, browser and MCP server, reports source lines, and extracts commands for review without executing them.

A clean report does not mean your installation works. Real installation tests and human comprehension checks still matter. I would like to hear which documentation failures have cost you the most time and which reproducible checks would help.

## Demo sequence

Paste a README with a relative image and a risky install command. Select npm. Show actual findings and their line numbers. Switch target and explain any actual differences. Export JSON. Show the verification plan and explicitly distinguish it from command execution. Use the real running release; do not fabricate findings or timing.

## Submission checks

Confirm the published package version, source repository, demo URL and measured validation results before submitting. Replace prerelease wording only when a release actually exists. The current kit makes no speed, accuracy, coverage, SOTA or popularity claim.

Product Hunt's [API documentation](https://www.producthunt.com/v2/docs) defaults applications to read access, requires approval for partial writes, and requires contacting Product Hunt for commercial API use. No general automated launch API has been validated here. Use the official submission flow and verify any permissions required for integration.

Follow the [community guidelines](https://help.producthunt.com/en/articles/3615694-community-guidelines): no bot engagement, mass messaging, requests for upvotes or incentivized votes. This kit is for honest product explanation and feedback, not automated social activity. Rules checked October 11, 2026.
