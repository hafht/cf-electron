# MIGRATION GUIDE: SINGLE REPO TO PNPM MONOREPO

This document outlines the step-by-step process to migrate the current isolated projects (`cf-electron` and `demo-client`) into a unified PNPM Workspace Monorepo.

## 🎯 Target Structure

```text
cf-electron-workspace/          (Root)
├── package.json                (Root scripts)
├── pnpm-workspace.yaml         (Workspace definition)
├── tsconfig.base.json          (Shared TS Config)
├── .gitignore                  (Root ignore)
├── apps/
│   └── demo-client/            (Prev: cf-2026 / demo-client)
└── packages/
    └── core/                   (Prev: cf-electron framework)

🛠 Prerequisites
PNPM: Ensure pnpm is installed (npm install -g pnpm).

Clean State: Commit all changes in existing repos before starting.

🏗 Phase 1: Initialize Root Workspace
Step 1.1: Create Root Configs
Create the following files at the root of the repo.

pnpm-workspace.yaml

YAML

packages:
  - 'packages/*'
  - 'apps/*'
package.json (Root)

JSON

{
  "name": "cf-electron-workspace",
  "private": true,
  "scripts": {
    "install:all": "pnpm install",
    "build:core": "pnpm --filter @creative-force/electron build",
    "watch:core": "pnpm --filter @creative-force/electron build:watch",
    "dev:client": "pnpm --filter cf-2026 dev",
    "typecheck": "pnpm -r exec tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.9.3",
    "vite": "^7.2.6",
    "rimraf": "^6.0.0"
  }
}
tsconfig.base.json

JSON

{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true
  }
}
.gitignore (Root)

Plaintext

node_modules
dist
out
.DS_Store
.eslintcache
*.log*
*.zip
.idea
.vscode
🏗 Phase 2: Migrate Framework (Package)
Step 2.1: Move Framework Code
Create folder packages/core.

Move content of cf-electron (source code) into packages/core.

Include: src, docs, NAMING-CONVENTIONS.md, tsconfig.json, vite.config.ts, package.json.

Exclude: node_modules, dist, .git, .idea.

Step 2.2: Clean up Framework
Delete legacy scripts folder packages/core/scripts (link/unlink scripts are no longer needed).

Step 2.3: Update Framework package.json
Modify packages/core/package.json:

JSON

{
  "name": "@creative-force/electron",
  "version": "0.1.0",
  "main": "dist/index.cjs",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "vite build",
    "build:watch": "vite build --watch",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "inversify": "^6.0.2",
    "reflect-metadata": "^0.2.2",
    "zod": "^4.2.1"
  }
  // Remove "link", "unlink", "zip" scripts
}
Step 2.4: Update Framework tsconfig.json
Extend from base config. Modify packages/core/tsconfig.json:

JSON

{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src",
    "composite": true
  },
  "include": ["src"]
}
🏗 Phase 3: Migrate Client App
Step 3.1: Move Client Code
Create folder apps/demo-client.

Move content of cf-2026 (or demo-client source) into apps/demo-client.

Include: src, electron.vite.config.ts, package.json, etc.

Exclude: node_modules, out, .git.

Step 3.2: Update Client package.json
Link dependency to workspace. Modify apps/demo-client/package.json:

JSON

{
  "name": "cf-2026",
  "dependencies": {
    "@creative-force/electron": "workspace:*", 
    "@angular/common": "...",
    // ... keep other deps
  }
}
Note: Ensure @creative-force/electron version is workspace:*.

Step 3.3: Update Client tsconfig.json files
Update apps/demo-client/tsconfig.json (and node/web variants if needed) to extend base.

apps/demo-client/tsconfig.json:

JSON

{
  "extends": "../../tsconfig.base.json",
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.web.json" }
  ]
}
🏗 Phase 4: Install & Verify
Step 4.1: Installation
Run at root:

Bash

pnpm install
Expected: pnpm creates symlinks in node_modules linking apps/demo-client to packages/core.

Step 4.2: Build Core
Run at root:

Bash

pnpm build:core
Expected: packages/core/dist is generated.

Step 4.3: Run Client
Run at root:

Bash

pnpm dev:client
Expected: The Electron app launches and successfully loads the framework.