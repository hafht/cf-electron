// src/window/windowTypes.ts
export interface WindowOptions {
    preloadPath: string;
  
    load: {
      devUrl?: string;
      prodFile?: string;
    };
  
    browserWindow?: Electron.BrowserWindowConstructorOptions;
  }
  