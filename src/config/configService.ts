export interface ConfigService<T> {
    get(): Readonly<T>;
}

export class DefaultConfigService<T> implements ConfigService<T> {

    constructor(private readonly config: Readonly<T>) {
    }

    get(): Readonly<T> {
        return this.config;
    }
}