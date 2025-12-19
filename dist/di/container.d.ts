import { Container } from 'inversify';

/**
 * Create a new app container if not exists
 * Only one container is allowed per app
 * Not global mutable outside container
 * @returns {Container} The app container
 */
export declare function createAppContainer(): Container;
