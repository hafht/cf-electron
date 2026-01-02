import { ZodError, z } from 'zod';
import type { AppModule, AppContainer } from '../core/coreTypes';
import type { AppConfigInput } from './appConfigTypes';
import { AppConfigServiceImpl } from './appConfigService';

export class AppConfigModule<T> implements AppModule {
  constructor(private readonly input: AppConfigInput<T>) {}

  register(container: AppContainer) {
    const { schema, value } = this.input;

    try {
      const parsed = schema.parse(value);
      console.log('[config] parsed config', parsed);
      container
        .bind(AppConfigServiceImpl)
        .toConstantValue(new AppConfigServiceImpl(parsed as Readonly<T>));
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('[config] invalid config', z.treeifyError(err));
      }
      throw new Error('Invalid application configuration');
    }
  }
}
