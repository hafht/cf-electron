import { ZodType } from 'zod';

export interface AppConfigInput<T> {
    schema: ZodType<T>;
    value: unknown;
}