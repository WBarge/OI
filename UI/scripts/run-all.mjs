// Runs one script in all three UI projects, in the order that matters: the library first, because both apps read its built output.
//
//   node scripts/run-all.mjs build   builds the library, then the OI UI, then the ProductManager UI. Stops at the first failure.
//   node scripts/run-all.mjs test    runs each project's tests ONCE (no watch). Runs all three even if one fails, then summarises.
//
// Use it through npm:  npm run build:all   /   npm run test:all   (from the UI folder)

import { spawnSync } from 'node:child_process';

const mode = process.argv[2];
if (mode !== 'build' && mode !== 'test') {
  console.error('Usage: node scripts/run-all.mjs build|test');
  process.exit(2);
}

const projects = ['oi-ui-common', 'orderInvoice', 'ProductAdmin'];
const results = [];

for (const project of projects) {
  console.log(`\n=== ${mode}: ${project} ===\n`);
  const args = ['run', mode, '--workspace', project];
  if (mode === 'test') {
    args.push('--', '--watch=false');
  }
  const run = spawnSync('npm', args, { stdio: 'inherit', shell: true });
  results.push({ project, ok: run.status === 0 });
  if (mode === 'build' && run.status !== 0) {
    break;   // nothing after a failed build can work
  }
}

console.log(`\n=== ${mode} summary ===`);
for (const { project, ok } of results) {
  console.log(`${ok ? 'PASSED' : 'FAILED'}  ${project}`);
}
const notRun = projects.filter((project) => !results.some((r) => r.project === project));
for (const project of notRun) {
  console.log(`NOT RUN ${project}`);
}
process.exit(results.every((r) => r.ok) && notRun.length === 0 ? 0 : 1);
