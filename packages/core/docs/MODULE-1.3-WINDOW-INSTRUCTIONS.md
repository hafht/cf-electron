# MODULE-1.3-WINDOW-INSTRUCTIONS.md

## Module: Window (Main Process)
**Phase:** 1 – Communication & Control  
**Depends on:**  
- Module 0.1 – App Bootstrap  
- Module 1.1 – IPC (Request/Response)  
- Module 1.2 – Configuration Management  

---

## 1. Purpose

The Window module is responsible for creating and managing the Electron `BrowserWindow`.

This module enables the application to:
- Run end-to-end (main → preload → renderer)
- Standardize window creation
- Enforce a secure baseline
- Remain minimal and extensible

> The Window module is infrastructure, not business logic.

---

## 2. Scope

### In Scope
- Create a single main `BrowserWindow`
- Attach preload script
- Load renderer (development / production)
- Handle window lifecycle (create / destroy)

### Out of Scope
- Multi-window management
- Window registry
- Menu / Tray
- Shortcuts
- Window state persistence
- Business IPC logic

---

## 3. Design Principles

### 3.1 Infrastructure Only
- No business logic
- No renderer framework knowledge (Angular / React / etc.)
- No IPC handlers

### 3.2 App-Owned Renderer Entry
- Framework does not hardcode URLs or file paths
- App decides dev/prod renderer entry

### 3.3 Security First
All windows created by this module MUST:
- Use `contextIsolation: true`
- Disable `nodeIntegration`
- Enable `sandbox`
- Avoid exposing Electron APIs to renderer

---

## 4. Public API

### 4.1 WindowOptions

```ts
export interface WindowOptions {
  preloadPath: string;

  load: {
    devUrl?: string;
    prodFile?: string;
  };

  browserWindow?: Electron.BrowserWindowConstructorOptions;
}
```

---

### 4.2 WindowMainModule

```ts
new WindowMainModule(options: WindowOptions)
```

Implements the `ElectronModule` interface and participates in the app lifecycle.

---

## 5. Lifecycle

```
createElectronApp()
   ↓
app.whenReady()
   ↓
WindowMainModule.start()
   ↓
BrowserWindow created
   ↓
preload attached
   ↓
renderer loaded
```

---

## 6. Usage Example (App Side)

```ts
import { createElectronApp } from '@creative-force/electron-core';
import { WindowMainModule } from '@creative-force/electron-window';
import { ConfigModule } from '@creative-force/electron-config';
import { z } from 'zod';

const AppConfigSchema = z.object({
  env: z.enum(['dev', 'prod'])
});

const isDev = process.env.NODE_ENV === 'development';

createElectronApp({
  appId: 'cf-window-demo',
  modules: [
    new ConfigModule({
      schema: AppConfigSchema,
      value: { env: isDev ? 'dev' : 'prod' }
    }),

    new WindowMainModule({
      preloadPath: require.resolve('../preload/preloadEntry.js'),
      load: {
        devUrl: isDev ? 'http://localhost:5173' : undefined,
        prodFile: !isDev
          ? require.resolve('../renderer/index.html')
          : undefined
      }
    })
  ]
});
```

---

## 7. Preload Example

```ts
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('api', {
  ping: () => 'pong'
});
```

---

## 8. Renderer Test

```ts
console.log(window.api.ping());
```

---

## 9. Security Checklist

- ✓ contextIsolation enabled
- ✓ nodeIntegration disabled
- ✓ sandbox enabled
- ✓ No Electron APIs exposed
- ✓ Window destroyed on shutdown

---

## 10. Anti-patterns

- Creating BrowserWindow outside Window module
- Hardcoding renderer URLs in framework
- Exposing Electron APIs in preload
- Business logic inside Window module

---

## 11. Definition of Done

- App runs in dev and prod
- Preload executes correctly
- Renderer isolated from Electron
- Naming conventions followed
- No unnecessary abstraction

---

## Guiding Principle

> Window is infrastructure, not business.
