# Security policy

Report suspected vulnerabilities privately through GitHub Security Advisories for ruvnet/readme-proof or ruv@ruv.net. Do not include credentials or unpublished vulnerability details in a public issue.

README input is untrusted data. The analyzer and browser UI do not execute extracted commands. Risk classifications are heuristics and never execution authorization. Treat generated plans and model interpretations as proposals. Perform any installation tests separately in an appropriately isolated environment without publication credentials.

The local UI renders findings through textContent. Analysis does not require an inference API or transmit README content to a hosted analysis service. An MCP host can receive input and results according to its own settings; review that host's data policy. Report files may contain repository text and command strings. Inspect them before sharing.

A content hash identifies bytes; it does not establish their truth, trusted authorship or successful execution. Optional RVF containers preserve artifacts and are not security certifications. The RVM contract is an optional deployment proposal until independently executed and verified.
