import { execFileSync } from 'node:child_process';
import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, symlink, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createReceipt, exportRvf, readRvf } from '../src/evidence.mjs';
test('actual RVF export, reopen, query and receipt roundtrip; tamper rejection', async () => {
 const dir = await mkdtemp(join(tmpdir(), 'proof-rvf-'));
 try {
  const path = join(dir, 'report.rvf');
  const receipt = createReceipt({ passed: 3, failed: 1 }, '# Hello');
  const result = await exportRvf(receipt, path);
  assert.ok(result.bytes > 100);
  assert.notEqual((await readFile(path)).subarray(0,1).toString(), '{');
  assert.deepEqual(await readRvf(path), receipt);
  const envelope = JSON.parse(await readFile(path + '.receipt.json'));
  await writeFile(path + '.receipt.json', JSON.stringify({...envelope, receipt:createReceipt({ passed: 4 }, '# Other')}));
  await assert.rejects(readRvf(path), /binding mismatch/);
  await writeFile(path + '.receipt.json', JSON.stringify(envelope));
  const bytes = await readFile(path); bytes[0] ^= 255; await writeFile(path, bytes);
  await assert.rejects(readRvf(path));
 } finally { await rm(dir, { recursive:true, force:true }); }
});
test('receipt canonicalizes object keys and rejects forged digest', async () => {
 assert.equal(createReceipt({a:1,b:2}, 'x').id, createReceipt({b:2,a:1}, 'x').id);
 await assert.rejects(exportRvf({ ...createReceipt({}, 'x'), id:'0'.repeat(64) }, '/unused'), /digest/);
});

test('RVF rejects symlink, FIFO, directory input and symlink output parents', {timeout:3000}, async () => {
 const dir = await mkdtemp(join(tmpdir(), 'proof-rvf-path-'));
 try {
  const real = join(dir, 'real.rvf');
  await exportRvf(createReceipt({}, 'x'), real);
  const link = join(dir, 'link.rvf');
  await symlink(real, link);
  await assert.rejects(readRvf(link));
  await assert.rejects(readRvf(dir), /regular file/);
  if (process.platform !== 'win32') {
    const fifo = join(dir, 'fifo.rvf');
    execFileSync('mkfifo', [fifo]);
    await assert.rejects(readRvf(fifo), /regular file/);
  }
  await mkdir(join(dir,'out'));
  await symlink(join(dir,'out'), join(dir,'alias'));
  await assert.rejects(exportRvf(createReceipt({},'x'), join(dir,'alias','e.rvf')), /symlink/);
 } finally { await rm(dir,{recursive:true,force:true}); }
});
