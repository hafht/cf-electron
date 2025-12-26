import { AppModule } from './types';

export declare function startModules(modules: AppModule[]): Promise<void>;
export declare function stopModules(modules: AppModule[]): Promise<void>;
/**
 * Setup app lifecycle hooks
 * @param modules - The modules to setup lifecycle hooks for
 * @description - Setup app lifecycle hooks for the given modules. Stop modules in reverse order before app quit.
 */
export declare function setupAppLifecycle(modules: AppModule[]): void;
