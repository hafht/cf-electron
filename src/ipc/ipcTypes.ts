// Share across all modules

export type IPCDomain = 'app' 

export const IPC_CHANNELS = {
    APP_GET_VERSION: 'app:getVersion',
  } as const;
  
  export type IpcChannel =
    typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS];