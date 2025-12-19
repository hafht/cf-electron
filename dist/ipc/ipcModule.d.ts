import { AppModule, AppContainer } from '../app/types';

export declare class IpcModule implements AppModule {
    private registry;
    register(_: AppContainer): void;
    stop(): Promise<void>;
}
