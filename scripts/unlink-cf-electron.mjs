import fs from 'fs';
import path from 'path';
import process from 'process';

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index !== -1 ? process.argv[index + 1] : null;
}

const clientPath =
  getArg('--client') || process.env.CF_ELECTRON_CLIENT;

if (!clientPath) {
  console.error(`
❌ Missing client path.

Usage:
  node unlink-electron.mjs --client /path/to/electron-vite-angular
`);
  process.exit(1);
}

const client = path.resolve(clientPath);
const linkPath = path.join(
  client,
  'node_modules',
  '@creative-force',
  'electron'
);

console.log('🧹 Removing @creative-force/electron symlink');

if (fs.existsSync(linkPath)) {
  fs.rmSync(linkPath, { recursive: true, force: true });
  console.log('✅ Symlink removed');
} else {
  console.log('ℹ️ No symlink found');
}
