import 'reflect-metadata';

// app
export { createElectronApp } from './core/createElectronApp';
export type { CreateAppOptions, AppModule, AppContainer } from './core/coreTypes';

// ipc
export { IpcMainModule } from './ipc/ipcMainModule';
export { IPC_CHANNELS } from './ipc/ipcChannels';

// config
export { AppConfigModule } from './config/appConfigModule';
export type { AppConfigInput } from './config/appConfigTypes';


// window
export * from './window';