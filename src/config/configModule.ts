import { ZodError, z } from 'zod';
import type { AppModule, AppContainer } from '../app/types';
import type { AppConfigInput } from './configTypes';
import { DefaultConfigService } from './configService';

export class ConfigModule<T> implements AppModule {
  constructor(private readonly input: AppConfigInput<T>) {}

  register(container: AppContainer) {
    const { schema, value } = this.input;

    try {
      const parsed = schema.parse(value);
      console.log('[config] parsed config', parsed);
      container
        .bind(DefaultConfigService)
        .toConstantValue(new DefaultConfigService(parsed as Readonly<T>));
    } catch (err) {
      if (err instanceof ZodError) {
        console.error('[config] invalid config', z.treeifyError(err));
      }
      throw new Error('Invalid application configuration');
    }
  }
}
