import { AppModule } from './types';

export declare function startModules(modules: AppModule[]): Promise<void>;
export declare function stopModules(modules: AppModule[]): Promise<void>;
export declare function setupAppLifecycle(modules: AppModule[]): void;
