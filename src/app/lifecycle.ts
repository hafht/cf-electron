import {app} from 'electron';
import { AppModule } from './types';

export async function startModules(modules: AppModule[]) {
    for (const module of modules) {
        if (module.start) {
            console.log(`[ElectronCore] Starting module ${module.constructor.name}`);
            await module.start();
        }
    }
};

export async function stopModules(modules: AppModule[]) {
    // reverse order to stop modules
    for (const module of modules.slice().reverse()) {
        if (module.stop) {
            console.log(`[ElectronCore] Stopping module ${module.constructor.name}`);
            await module.stop();
        }
    }
};

export function setupAppLifecycle(modules: AppModule[]) {
   app.on('before-quit', async (event) => {
    console.log(`[ElectronCore] App before quit`);
    event.preventDefault();
    try {
        await stopModules(modules);
    } catch (error) {
        console.error(`[ElectronCore] Error during shutdown' ${error}`);
    }
    finally {
        console.log(`[ElectronCore] App quitting`);
        app.exit(0);
    }
   });
};