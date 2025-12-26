# NAMING-CONVENTIONS.md

## Purpose
This document defines **naming conventions** for the Creative Force Electron Framework.
The goal is to ensure:
- Long-term consistency
- Clear ownership boundaries (framework vs app)
- No future large-scale renaming
- Good Developer Experience (DX)
- Easy onboarding for developers and AI-assisted tooling

These rules are **frozen for v0.x → v1** unless explicitly revised.

---

## 1. General Principles

1. Names must reflect **responsibility**, not implementation.
2. Names must make **ownership obvious** (framework vs app vs business).
3. Avoid generic names that become dumping grounds.
4. Prefer clarity over brevity.
5. Naming must scale to multi-app, multi-module scenarios.

---

## 2. Package Naming

**Format**
```
@creative-force/electron-<domain>
```

**Examples**
- @creative-force/electron-core
- @creative-force/electron-ipc
- @creative-force/electron-config
- @creative-force/electron-logger
- @creative-force/electron-services
- @creative-force/electron-auth

**Rules**
- One package = one clear responsibility
- No mixed domains in a single package
- Business-specific logic does NOT belong in framework packages

---

## 3. Folder Naming

**Rule**
- Folder name = **domain or layer (noun)**

**Good**
- core/
- ipc/
- config/
- preload/
- window/
- auth/
- services/
- logger/

**Avoid**
- app/ (ambiguous: framework app vs client app)
- types/ (too generic)
- utils/ (only allowed for truly generic helpers)

---

## 4. File Naming

**Rule**
```
<responsibility><Context>.ts
```

Context examples:
- Module
- Service
- Registry
- Types
- Entry
- Api

### Core
- createElectronApp.ts
- appLifecycle.ts
- coreTypes.ts

### IPC
- ipcChannels.ts
- ipcHandlerRegistry.ts
- ipcMainModule.ts
- ipcContracts.ts (request/response payload types)

### Config
- appConfigTypes.ts
- appConfigService.ts
- appConfigModule.ts

### Preload
- preloadEntry.ts
- preloadApi.ts
- preloadBridge.ts (if needed)

**Index files**
- index.ts is allowed ONLY to re-export public API
- index.ts must not contain logic

---

## 5. Class & Interface Naming

### Interfaces
- Use **role-based naming**
- Avoid implementation hints

**Examples**
- ElectronModule
- AppContainer
- AppConfigService<T>
- IpcHandlerRegistry

### Implementations
- Suffix with Impl or Default

**Examples**
- AppConfigServiceImpl
- DefaultAppConfigService

Avoid ambiguous names like:
- DefaultConfigService
- BaseService

---

## 6. IPC Channel Naming

**Rule**
```
<domain>:<action>
```

**Examples**
- app:getVersion
- auth:login
- task:downloadResource
- netcore:startService

**Rules**
- IPC strings must exist ONLY in ipcChannels.ts
- No string literals outside IPC contract files
- Domain represents business/domain, not module name
- Action is verb-based

---

## 7. Preload API Naming

**Rule**
```
window.api.<domain>.<action>()
```

**Examples**
- window.api.app.getVersion()
- window.api.auth.login()
- window.api.task.downloadResource(taskId)

**Hard rules**
- Renderer must not import Electron or IPC APIs
- Preload exposes ONE object: window.api
- No dynamic channel names
- No raw ipcRenderer exposure

---

## 8. Config Naming

**Rules**
- Config is always App-owned
- Config is read-only
- Schema name ends with Schema

**Examples**
- AppConfigSchema
- AppConfig
- AppConfigService

Framework must not define business config schemas.

---

## 9. Documentation Naming

**Rule**
```
MODULE-<phase>.<index>-<NAME>.md
```

**Examples**
- MODULE-0.1-NOTES.md
- MODULE-1.1-INSTRUCTIONS.md
- MODULE-1.2-INSTRUCTIONS.md

Always use plural INSTRUCTIONS for consistency.

---

## 10. Anti-patterns (Do Not Use)

- Generic folders like types/ or utils/
- String literal IPC channels
- Re-exporting third-party DSLs (e.g., zod)
- Naming tied to current implementation
- Abbreviations that reduce clarity

---

## 11. Enforcement

1. PR checklist must include:
   - Naming conventions followed
2. Major naming changes require:
   - Documentation update
   - Explicit review
3. Breaking naming changes require MAJOR version bump

---

## 12. Guiding Principle

> **Good naming is part of architecture, not a cosmetic choice.**

If a name is unclear today, it will become technical debt tomorrow.
