export interface AppConfigService<T> {
    get(): Readonly<T>;
}

export class AppConfigServiceImpl<T> implements AppConfigService<T> {

    constructor(private readonly config: Readonly<T>) {
    }

    get(): Readonly<T> {
        return this.config;
    }
}