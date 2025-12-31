// src/window/windowMainModule.ts
import { BrowserWindow } from 'electron';
import { join } from 'node:path';
import type { AppModule, AppContainer } from '../core/coreTypes';
import type { WindowOptions } from './windowTypes';

export class WindowMainModule implements AppModule {
  private mainWindow?: BrowserWindow;

  constructor(private readonly options: WindowOptions) {}

  register(_container: AppContainer) {
    // no-op for now
  }

  async start() {
    const {
      preloadPath,
      load,
      browserWindow = {}
    } = this.options;
    console.log('[window] starting window', this.options);
    this.mainWindow = new BrowserWindow({
      width: 1200,
      height: 800,
      show: false,
      webPreferences: {
        preload: preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        sandbox: true,
      },
      ...browserWindow
    });

    this.mainWindow.once('ready-to-show', () => {
      this.mainWindow?.show();
    });

    if (load.devUrl) {
      await this.mainWindow.loadURL(load.devUrl);
    } else if (load.prodFile) {
      await this.mainWindow.loadFile(load.prodFile);
    } else {
      throw new Error('[window] No renderer entry provided');
    }
  }

  async stop() {
    if (this.mainWindow && !this.mainWindow.isDestroyed()) {
      this.mainWindow.destroy();
    }
  }
}
