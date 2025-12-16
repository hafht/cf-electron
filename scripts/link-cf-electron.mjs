import fs from 'fs';
import path from 'path';
import process from 'process';

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index !== -1 ? process.argv[index + 1] : null;
}

const frameworkPath =
  getArg('--framework') || process.env.CF_ELECTRON_FRAMEWORK;
const clientPath =
  getArg('--client') || process.env.CF_ELECTRON_CLIENT;

if (!frameworkPath || !clientPath) {
  console.error(`
❌ Missing paths.

Usage:
  node link-electron.mjs --framework /path/to/cf-electron --client /path/to/electron-vite-angular

Or via env:
  CF_ELECTRON_FRAMEWORK=/path/to/cf-electron
  CF_ELECTRON_CLIENT=/path/to/electron-vite-angular
`);
  process.exit(1);
}

const framework = path.resolve(frameworkPath);
const client = path.resolve(clientPath);

const targetDir = path.join(
  client,
  'node_modules',
  '@creative-force'
);
const linkPath = path.join(targetDir, 'electron');

console.log('🔗 Linking @creative-force/electron');
console.log('Framework:', framework);
console.log('Client:', client);

fs.mkdirSync(targetDir, { recursive: true });

if (fs.existsSync(linkPath)) {
  console.log('⚠️ Existing link found. Removing...');
  fs.rmSync(linkPath, { recursive: true, force: true });
}

fs.symlinkSync(framework, linkPath, 'dir');

console.log('✅ Symlink created:');
console.log(linkPath);
