import fs from 'fs';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index !== -1 ? process.argv[index + 1] : null;
}

// Get workspace folder (parent directory of scripts folder, which is cf-electron)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frameworkFolder = path.resolve(__dirname, '..'); // This is cf-electron folder
const workspaceFolder = path.resolve(frameworkFolder, '..'); // This is test/ folder

// Try to get paths from args, env, or use defaults
let frameworkPath =
  getArg('--framework') || process.env.CF_ELECTRON_FRAMEWORK;
let clientPath = getArg('--client') || process.env.CF_ELECTRON_CLIENT;

// Auto-detect default paths if not provided
if (!frameworkPath) {
  frameworkPath = frameworkFolder; // Use current cf-electron folder
  console.log('ℹ️  Using default framework path:', frameworkPath);
}

if (!clientPath) {
  clientPath = path.join(workspaceFolder, 'cf-2026');
  console.log('ℹ️  Using default client path:', clientPath);
}

// Validate paths exist
if (!fs.existsSync(frameworkPath)) {
  console.error(`
❌ Framework path does not exist: ${frameworkPath}

Usage:
  node link-cf-electron.mjs --framework /path/to/cf-electron --client /path/to/cf-2026

Or via env:
  CF_ELECTRON_FRAMEWORK=/path/to/cf-electron
  CF_ELECTRON_CLIENT=/path/to/cf-2026

Or use default paths in workspace folder:
  - cf-electron (framework)
  - cf-2026 (client)
`);
  process.exit(1);
}

if (!fs.existsSync(clientPath)) {
  console.error(`
❌ Client path does not exist: ${clientPath}

Usage:
  node link-cf-electron.mjs --framework /path/to/cf-electron --client /path/to/cf-2026

Or via env:
  CF_ELECTRON_FRAMEWORK=/path/to/cf-electron
  CF_ELECTRON_CLIENT=/path/to/cf-2026

Or use default paths in workspace folder:
  - cf-electron (framework)
  - cf-2026 (client)
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
