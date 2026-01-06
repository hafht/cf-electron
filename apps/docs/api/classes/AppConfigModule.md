[**CF Electron Framework**](../README.md)

***

# Class: AppConfigModule\<T\>

Defined in: [config/appConfigModule.ts:7](https://github.com/hafht/cf-electron/blob/main/packages/core/src/config/appConfigModule.ts#L7)

Base interface for all Electron app modules.
Modules must implement the disposable pattern to properly clean up resources.

## Extends

- `Disposable`

## Type Parameters

### T

`T`

## Implements

- [`AppModule`](../interfaces/AppModule.md)

## Constructors

### Constructor

> **new AppConfigModule**\<`T`\>(`input`): `AppConfigModule`\<`T`\>

Defined in: [config/appConfigModule.ts:8](https://github.com/hafht/cf-electron/blob/main/packages/core/src/config/appConfigModule.ts#L8)

#### Parameters

##### input

[`AppConfigInput`](../interfaces/AppConfigInput.md)\<`T`\>

#### Returns

`AppConfigModule`\<`T`\>

#### Overrides

`Disposable.constructor`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: common/lifecycle.ts:40

Dispose of all registered resources.
Safe to call multiple times - will only dispose once.

#### Returns

`void`

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`dispose`](../interfaces/AppModule.md#dispose)

#### Inherited from

`Disposable.dispose`

***

### register()

> **register**(`container`): `void`

Defined in: [config/appConfigModule.ts:12](https://github.com/hafht/cf-electron/blob/main/packages/core/src/config/appConfigModule.ts#L12)

Register dependencies & handler
Called before Electron app ready

#### Parameters

##### container

`Container`

#### Returns

`void`

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`register`](../interfaces/AppModule.md#register)
