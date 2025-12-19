import { Container } from 'inversify';

export type AppContainer = Container;
export interface AppModule {
    identifier: string;
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
