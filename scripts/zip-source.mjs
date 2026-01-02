import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index !== -1 ? process.argv[index + 1] : null;
}

// Get project root folder (parent directory of scripts folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

// Format date time for filename: YYYYMMDD-HHMMSS
function formatDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hours}${minutes}${seconds}`;
}

// Get output path from args or use default
const customOutput = getArg('--output') || getArg('-o');
let zipPath;

if (customOutput) {
  // If custom output is provided, resolve it relative to project root if it's not absolute
  if (path.isAbsolute(customOutput)) {
    zipPath = customOutput;
  } else {
    zipPath = path.resolve(projectRoot, customOutput);
  }
} else {
  // Default: create zip file in project root
  zipPath = path.join(projectRoot, `cf-electron-${formatDateTime()}.zip`);
}

console.log('📦 Creating source code zip...');
console.log('Project root:', projectRoot);
console.log('Output file:', zipPath);

// Create output directory if needed
const outputDir = path.dirname(zipPath);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Remove existing zip if exists
if (fs.existsSync(zipPath)) {
  console.log('⚠️  Removing existing zip file...');
  fs.unlinkSync(zipPath);
}

// Create zip archive
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', {
  zlib: { level: 9 }, // Maximum compression
});

output.on('close', () => {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log('✅ Zip created successfully!');
  console.log(`📊 Total size: ${sizeInMB} MB`);
  console.log(`📁 File: ${zipPath}`);
});

archive.on('error', (err) => {
  console.error('❌ Error creating zip:', err);
  process.exit(1);
});

archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    console.warn('⚠️  Warning:', err);
  } else {
    throw err;
  }
});

archive.pipe(output);

// Files and directories to exclude
const excludeDirs = ['node_modules', 'dist', '.git'];
const excludeFiles = ['.DS_Store', '.eslintcache'];
const excludeExtensions = ['.log', '.zip'];

// Function to check if path should be excluded
function shouldExclude(filePath) {
  const relativePath = path.relative(projectRoot, filePath);
  const pathParts = relativePath.split(path.sep);
  const fileName = path.basename(filePath);

  // Check excluded directories
  for (const dir of excludeDirs) {
    if (pathParts.includes(dir)) {
      return true;
    }
  }

  // Check excluded file names
  for (const file of excludeFiles) {
    if (fileName === file || relativePath.includes(file)) {
      return true;
    }
  }

  // Check excluded file extensions
  for (const ext of excludeExtensions) {
    if (fileName.endsWith(ext) || relativePath.endsWith(ext)) {
      return true;
    }
  }

  return false;
}

// Add files to archive
function addDirectory(dirPath, archivePath = '') {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(archivePath, entry.name);

    // Skip excluded paths
    if (shouldExclude(fullPath)) {
      continue;
    }

    if (entry.isDirectory()) {
      addDirectory(fullPath, relativePath);
    } else if (entry.isFile()) {
      archive.file(fullPath, { name: relativePath });
    }
  }
}

// Start adding files
addDirectory(projectRoot);

// Finalize the archive
archive.finalize();

