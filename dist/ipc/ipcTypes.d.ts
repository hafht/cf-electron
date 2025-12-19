export type IPCDomain = 'app';
export declare const IPC_CHANNELS: {
    readonly APP_GET_VERSION: "app:getVersion";
};
export type IpcChannel = typeof IPC_CHANNELS[keyof typeof IPC_CHANNELS];
