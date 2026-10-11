import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

test('real MCP stdio discovery, tool call, ruv resource roundtrip and invalid inputs', { timeout:15000 }, async () => {
  const client = new Client({name:'readme-proof-acceptance',version:'1.0.0'});
  const transport = new StdioClientTransport({command:process.execPath,args:[fileURLToPath(new URL('../src/mcp.mjs',import.meta.url))],stderr:'pipe'});
  await client.connect(transport);
  try {
    const tools = await client.listTools();
    assert.deepEqual(tools.tools.map(x=>x.name).sort(), ['readme_analyze','readme_plan']);
    const markdown = '# Example\n\n![Image](./missing.svg)\n\n```bash\nnpm install example\n```\n';
    const result = await client.callTool({name:'readme_analyze',arguments:{markdown,target:'npm',files:[]}});
    assert.ok(!result.isError);
    const receipt = JSON.parse(result.content[0].text);
    assert.match(receipt.id,/^[a-f0-9]{64}$/);
    assert.equal(receipt.evidenceUri,'ruv://readme-proof/evidence/'+receipt.id);
    const resources = await client.listResources();
    assert.ok(resources.resources.some(x=>x.uri===receipt.evidenceUri));
    const resource = await client.readResource({uri:receipt.evidenceUri});
    const stored = JSON.parse(resource.contents[0].text);
    const {evidenceUri,...expected}=receipt;
    assert.deepEqual(stored,expected);
    const plan = await client.callTool({name:'readme_plan',arguments:{markdown}});
    assert.equal(JSON.parse(plan.content[0].text).executed,false);
    for (const args of [{markdown:42},{markdown:'x',target:'shell'},{markdown:'x'.repeat(1048577)}]) {
      const invalid = await client.callTool({name:'readme_analyze',arguments:args});
      assert.equal(invalid.isError,true);
    }
    await assert.rejects(client.readResource({uri:'file:///etc/passwd'}));
    await assert.rejects(client.readResource({uri:'ruv://readme-proof/evidence/'+'0'.repeat(64)}));
  } finally { await client.close(); }
});
