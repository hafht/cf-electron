import {app} from 'electron';
import { AppModule } from './types';

export async function startModules(modules: AppModule[]) {
    for (const module of modules) {
        if (module.start) {
            console.log(`[electron-core] Starting module ${module.constructor.name}`);
            await module.start();
        }
    }
};

export async function stopModules(modules: AppModule[]) {
    // reverse order to stop modules
    for (const module of modules.slice().reverse()) {
        if (module.stop) {
            console.log(`[electron-core] Stopping module ${module.constructor.name}`);
            await module.stop();
        }
    }
};

/**
 * Setup app lifecycle hooks
 * @param modules - The modules to setup lifecycle hooks for
 * @description - Setup app lifecycle hooks for the given modules. Stop modules in reverse order before app quit.    
 */
export function setupAppLifecycle(modules: AppModule[]) {
   app.on('before-quit', async (event) => {
    console.log(`[electron-core] App before quit`);
    event.preventDefault();
    try {
        await stopModules(modules);
    } catch (error) {
        console.error(`[electron-core] Error during shutdown' ${error}`);
    }
    finally {
        console.log(`[electron-core] App quitting`);
        app.exit(0);
    }
   });
};