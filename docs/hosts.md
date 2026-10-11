# Local hosts and redistributable plugins

Requires Node.js and the built `dist/mcp.mjs` entrypoint. Build the source checkout before loading the plugin. A source manifest alone does not install dependencies or prove compatibility with a particular host version.

## Claude Code

Load this repository with Claude Code's documented local plugin directory option:

```sh
claude --plugin-dir /absolute/path/to/readme-proof
```

The `.claude-plugin/plugin.json` manifest declares the shared skill and the local MCP process through `${CLAUDE_PLUGIN_ROOT}`. Approve the server through the host's normal flow. Verify discovery of `readme_analyze` and `readme_plan`, then analyze harmless sample Markdown. Host runtime verification is required; source packaging does not establish an installed connection.

## Codex and portable hosts

The root `plugin.json` and `mcp.json` use Agent Plugins 1.0. Portable hosts resolve `${PLUGIN_ROOT}`. `.codex-plugin/plugin.json` provides matching compatibility metadata. Use the host's supported local plugin import or marketplace registration flow. This repository is not registered in a public marketplace and has not been installed into your account.

For hosts that do not resolve portable variables, configure a local stdio MCP server explicitly:

```json
{
  "mcpServers": {
    "readme-proof": {
      "command": "node",
      "args": ["/absolute/path/to/readme-proof/dist/mcp.mjs"]
    }
  }
}
```

Do not copy Claude specific `${CLAUDE_PLUGIN_ROOT}` configuration into a host that does not support it. The included skill can also be copied into an explicitly chosen host skill directory, preserving its complete folder. Skills do not start MCP services by themselves.

## Validation boundary

Check server startup, tools/list, a harmless tools/call and receipt retrieval in the actual host. Local stdio servers need a machine that can run Node.js. Uploading these manifests does not make the process available to ChatGPT web or mobile; that requires a separately hosted compatible endpoint.

Official references checked October 11, 2026: [OpenAI packaging](https://developers.openai.com/plugins/build/plugins), [Claude manifest reference](https://code.claude.com/docs/en/plugins-reference). Host formats and support can change.
