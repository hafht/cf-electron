import { ipcMain } from 'electron';
import type { IpcChannel } from './ipcChannels';

type IpcHandler = (...args: any[]) => Promise<any>;

export class IpcRegistry {
    private registered = new Set<IpcChannel>();

    register(channel: IpcChannel, handler: IpcHandler) {
       if (this.registered.has(channel)) {
        throw new Error(`[ipc] Channel already registered: ${channel}`);
       }
       this.registered.add(channel);
       ipcMain.handle(channel, async (_event, ...args) => {
        try {
            return await handler(...args);
        } catch (error) {
            console.error(`[ipc] Handler error: ${channel}`, error);
            throw new Error('IPC_OPERATION_FAILED');
        }
       });
    }

    clear() {
        for (const channel of this.registered) {
            ipcMain.removeHandler(channel);
        }
        this.registered.clear();
    }
}