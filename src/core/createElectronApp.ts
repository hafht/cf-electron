import { app } from 'electron';
import { createAppContainer } from '../di/container';
import { setupAppLifecycle, startModules } from './appLifecycle';
import { CreateAppOptions } from './coreTypes';


export async function createElectronApp(options: CreateAppOptions) {
   const {appId, modules = []} = options;
   if (!appId) {
    throw new Error('[electron-core] appId is required');
   }

   console.log(`[electron-core] Starting app ${appId}`);

   const container = createAppContainer();

   // Register modules (sync, before app ready)
   for (const module of modules) {
    try {
        console.log(`[electron-core] Registering module: ${module.constructor.name}`);
        module.register(container);
    } catch (error) {
        console.error(`[electron-core] Failed to register module: ${module.constructor.name}`, error);
        throw error;
    }
   }

   // Setup app lifecycle hooks
   setupAppLifecycle(modules);

   // Wait for app ready
   await app.whenReady();
   console.log(`[electron-core] App ready`);

   // Start modules (async, after app ready)
   try {
    await startModules(modules);
   } catch (error) {
    console.error(`[electron-core] Failed to start modules`, error);
    app.exit(1);
   }
};
