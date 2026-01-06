import { Container } from "inversify";
import type { IDisposable } from "../common/lifecycle";

export type AppContainer = Container;

/**
 * Base interface for all Electron app modules.
 * Modules must implement the disposable pattern to properly clean up resources.
 */
export interface AppModule extends IDisposable {
    /**
     * Register dependencies & handler
     * Called before Electron app ready
     */
    register(container: AppContainer): void;
    /**
     * Start the app
     * Called after Electron app ready
     */
    start?(): Promise<void>;
    /**
     * Stop the app
     * Called when app is quitting
     */
    stop?(): Promise<void>;
    /**
     * Dispose of resources held by this module.
     * Called to clean up resources and prevent memory leaks.
     * Modules should extend the Disposable class (from common/lifecycle) for automatic resource management.
     */
    dispose(): void;
}

/**
 * Options for creating an Electron app
 */
export interface CreateAppOptions {
    appId: string;
    /**
     * The name of the app (optional). Fallback to appId if not provided
     * @default undefined
     */
    appName?: string;
    /**
     * The configuration for the app
     */
    config?: unknown;
    /**
     * The modules for the app
     */
    modules?: AppModule[];
}
