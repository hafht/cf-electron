import { Container } from 'inversify';

let container: Container | null = null;

/**
 * Create a new app container if not exists
 * Only one container is allowed per app
 * Not global mutable outside container
 * @returns {Container} The app container
 */
export function createAppContainer(): Container {
   if (!container) {
    container = new Container({
        defaultScope: 'Singleton',
        autoBindInjectable: false,
    });
   }
   return container;
};
