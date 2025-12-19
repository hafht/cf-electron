import 'reflect-metadata';

// app
export { createElectronApp } from './app/createElectronApp';
export type { CreateAppOptions, AppModule, AppContainer } from './app/types';

// ipc
export { IpcModule } from './ipc/ipcModule';
export { IPC_CHANNELS } from './ipc/ipcTypes';
