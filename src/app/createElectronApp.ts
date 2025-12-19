import { app } from 'electron';
import { createAppContainer } from '../di/container';
import { setupAppLifecycle, startModules } from './lifecycle';
import { CreateAppOptions } from './types';


export async function createElectronApp(options: CreateAppOptions) {
   const {appId, modules = []} = options;
   if (!appId) {
    throw new Error('[ElectronCore] appId is required');
   }

   console.log(`[ElectronCore] Starting app ${appId}`);

   const container = createAppContainer();

   // Register modules (sync, before app ready)
   for (const module of modules) {
    try {
        console.log(`[ElectronCore] Registering module: ${module.constructor.name}`);
        module.register(container);
    } catch (error) {
        console.error(`[ElectronCore] Failed to register module: ${module.constructor.name}`, error);
        throw error;
    }
   }

   // Setup app lifecycle hooks
   setupAppLifecycle(modules);

   // Wait for app ready
   await app.whenReady();
   console.log(`[ElectronCore] App ready`);

   // Start modules (async, after app ready)
   try {
    await startModules(modules);
   } catch (error) {
    console.error(`[ElectronCore] Failed to start modules`, error);
    app.exit(1);
   }
};
