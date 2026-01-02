import type { AppModule, AppContainer } from '../core/coreTypes';
import { IpcRegistry } from './ipcHandlerRegistry';
import { IPC_CHANNELS } from './ipcChannels';
import { app } from 'electron';

export class IpcMainModule implements AppModule {
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
