# Optional RVM deployment contract

Status: deployment proposal; no RVM execution or isolation claim has been validated for this package.

An RVM adapter should accept only README bytes, the publication target and an explicit file inventory. It should run the static analyzer with network disabled, no inherited credentials, a read only runtime filesystem, bounded memory and a fixed deadline. Return the structured report plus input, runtime and output hashes. Do not interpret extracted commands as executable instructions.

The adapter must be tested against the selected RVM version before deployment. These requirements are a contract description, not a claimed supported RVM manifest schema. RVF report export and RVM runtime isolation are separate integrations.

Acceptance: a hostile README cannot trigger process execution or network activity, the runtime returns the expected report, and the host can independently verify the recorded hashes.
