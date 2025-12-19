import { ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../ipc/ipcTypes';

export const api = {
  app: {
    getVersion(): Promise<string> {
      return ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION);
    }
  },
};
