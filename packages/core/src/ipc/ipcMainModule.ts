import type { AppModule, AppContainer } from '../core/coreTypes';
import { IpcRegistry } from './ipcHandlerRegistry';
import { IPC_CHANNELS } from './ipcChannels';
import { app } from 'electron';
import { Disposable } from '../common/lifecycle';

export class IpcMainModule extends Disposable implements AppModule {
  private ipcRegistry = new IpcRegistry();

  constructor() {
    super();
    this._register(this.ipcRegistry);
  }

  register(_: AppContainer) {
    // register IPC channels 
    // App domain
    this.ipcRegistry.register(
      IPC_CHANNELS.APP_GET_VERSION,
      async () => app.getVersion()
    );
  }

  async stop() {
    this.dispose();
  }
}
