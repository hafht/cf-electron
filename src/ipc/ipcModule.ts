import type { AppModule, AppContainer } from '../app/types';
import { IpcRegistry } from './ipcRegistry';
import { IPC_CHANNELS } from './ipcTypes';
import { app } from 'electron';

export class IpcModule implements AppModule {
  private registry = new IpcRegistry();

  register(_: AppContainer) {
    // register IPC channels 
    // App domain
    this.registry.register(
      IPC_CHANNELS.APP_GET_VERSION,
      async () => app.getVersion()
    );
  }

  async stop() {
    this.registry.clear();
  }
}
