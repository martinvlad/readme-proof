# Live product discovery evidence

Captured October 11, 2026 at 17:47:29.593 UTC, or 13:47:29.593 America/Toronto.

The factory's [discovery record](evidence/discovery-2026-10-11.json) contains source URLs, retrieval timestamps, statuses and digests. The [frozen candidate plan](evidence/candidate-plan-2026-10-11.json) records scores, provenance and required gates. Source content is untrusted data and does not authorize execution.

The sweep recorded 25 successful source fetches and two errors: one invalid HN item and an unavailable or malformed Hugging Face daily papers response. The successful sources include HN, arXiv, selected ruvnet GitHub releases and the Product Hunt feed. A failed source was retained as an error, not silently treated as fresh research.

README Proof ranked 20.63 out of 25 in the frozen plan: utility 5, demand 3.63, feasibility 5, reuse 4 and novelty 3. These are heuristic scores. Editorial priors are explicit; demand uses the observed HN signal. The selected [HN story](https://news.ycombinator.com/item?id=50042219) had 278 points and 143 comments at this later snapshot. The ADR's earlier browser snapshot recorded 262 points and 134 comments; these are different retrieval times, not conflicting measurements.

The plan compares README Proof with MCP contract checks and agent budget receipts. The latter two lacked qualifying recent HN evidence in this bounded sweep and were marked ineligible. That does not establish that their markets lack demand. Popularity is not proof of customer value, research is not a SOTA claim, and this candidate plan is not a full market survey.

The frozen plan explicitly says `executionAuthorized: false` and `promotionState: draft`. These describe the planner output's authority boundary, not a claim that later separately authorized implementation is prohibited. Publication must use the actual release outcome rather than infer success from this record.

Product Hunt entries in the raw feed include Atom identifiers with a `tag:` scheme. Preserve them as identifiers; do not present them as clickable public launch URLs or evidence of a successful submission.
