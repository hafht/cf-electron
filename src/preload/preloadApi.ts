import { ipcRenderer } from 'electron';
import { IPC_CHANNELS } from '../ipc/ipcChannels';

export const api = {
  app: {
    getVersion(): Promise<string> {
      return ipcRenderer.invoke(IPC_CHANNELS.APP_GET_VERSION);
    }
  },
};
