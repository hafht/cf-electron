import { IpcChannel } from './ipcTypes';

type IpcHandler = (...args: any[]) => Promise<any>;
export declare class IpcRegistry {
    private registered;
    register(channel: IpcChannel, handler: IpcHandler): void;
    clear(): void;
}
export {};
