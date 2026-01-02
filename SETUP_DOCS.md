# GUIDE: SETUP DOCUMENTATION WEBSITE (VitePress + TypeDoc)

This document outlines the steps to initialize the documentation site in `apps/docs` and configure automated API generation from the framework source code.

## 🎯 Target Structure

```text
cf-electron-workspace/
├── apps/
│   ├── docs/                  (New Documentation Site)
│   │   ├── .vitepress/        (Config)
│   │   ├── api/               (Auto-generated API docs)
│   │   ├── guide/             (Manual guides)
│   │   └── package.json

🛠 Prerequisites
Workspace root is set up.

packages/core exists and has TypeScript code.

🏗 Phase 1: Scaffolding VitePress
Step 1.1: Create Directory & Init Package
Create directory apps/docs.

Initialize package.json in apps/docs.

apps/docs/package.json

JSON

{
  "name": "docs",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vitepress dev",
    "build": "pnpm run gen:api && vitepress build",
    "preview": "vitepress preview",
    "gen:api": "typedoc"
  },
  "dependencies": {
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "vitepress": "^1.0.0",
    "typedoc": "^0.25.0",
    "typedoc-plugin-markdown": "^4.0.0",
    "typescript": "^5.0.0"
  }
}
Step 1.2: Install Dependencies
Run from workspace root:

Bash

pnpm install
🏗 Phase 2: Configure TypeDoc (Auto API)
TypeDoc will read packages/core/src and generate Markdown files into apps/docs/api.

Step 2.1: Create TypeDoc Config
Create apps/docs/typedoc.json:

JSON

{
  "$schema": "[https://typedoc.org/schema.json](https://typedoc.org/schema.json)",
  "entryPoints": ["../../packages/core/src/index.ts"],
  "out": "./api",
  "plugin": ["typedoc-plugin-markdown"],
  "name": "CF Electron Framework",
  "hideBreadcrumbs": true,
  "hideInPageTOC": true,
  "readme": "none",
  "gitRevision": "main",
  "excludePrivate": true,
  "excludeProtected": true,
  "entryPointStrategy": "resolve"
}
🏗 Phase 3: Configure VitePress
Step 3.1: Create Configuration
Create apps/docs/.vitepress/config.mts:

TypeScript

import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "CF Electron",
  description: "Internal Electron Framework Documentation",
  
  // Theme Configuration
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API Reference', link: '/api/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Architecture', link: '/guide/architecture' }
          ]
        },
        {
          text: 'Core Modules',
          items: [
            { text: 'App Bootstrap', link: '/guide/module-bootstrap' },
            { text: 'IPC', link: '/guide/module-ipc' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API Reference',
          items: [
            { text: 'Exports', link: '/api/modules' },
            // Note: Users will navigate via the generated modules page
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: '[https://github.com/your-org/cf-electron](https://github.com/your-org/cf-electron)' }
    ]
  },
  
  // Enable code snippets from other packages
  markdown: {
    // This allows importing code like: <<< ../../apps/demo-client/src/app.ts
  }
})
🏗 Phase 4: Create Content
Step 4.1: Homepage
Create apps/docs/index.md:

Markdown

---
layout: home

hero:
  name: "CF Electron"
  text: "Internal Framework for Desktop Apps"
  tagline: Standardization. Security. Performance.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/

features:
  - title: Secure by Default
    details: Pre-configured security best practices (Context Isolation, Sandbox).
  - title: Module Based
    details: Composable architecture with Dependency Injection.
  - title: Type-Safe
    details: End-to-end type safety from Main to Renderer.
---
Step 4.2: Getting Started Guide (With Live Snippet)
Create apps/docs/guide/getting-started.md. Note: We will reference code from the demo-client app.

Markdown

# Getting Started

## Installation

\`\`\`bash
pnpm add @creative-force/electron
\`\`\`

## Basic Usage

Here is how you bootstrap an application. This code is pulled directly from our `demo-client` app:

<<< ../../../apps/demo-client/src/main/index.ts
🏗 Phase 5: Run & Verify
Generate API Docs: Run pnpm --filter docs gen:api. Check if apps/docs/api folder is created with markdown files.

Start Dev Server: Run pnpm --filter docs dev. Open localhost URL to see the site.