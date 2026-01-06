[**CF Electron Framework**](../README.md)

***

# Interface: AppModule

Defined in: [core/coreTypes.ts:10](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L10)

Base interface for all Electron app modules.
Modules must implement the disposable pattern to properly clean up resources.

## Extends

- `IDisposable`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [core/coreTypes.ts:31](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L31)

Dispose of resources held by this module.
Called to clean up resources and prevent memory leaks.
Modules should extend the Disposable class (from common/lifecycle) for automatic resource management.

#### Returns

`void`

#### Overrides

`IDisposable.dispose`

***

### register()

> **register**(`container`): `void`

Defined in: [core/coreTypes.ts:15](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L15)

Register dependencies & handler
Called before Electron app ready

#### Parameters

##### container

`Container`

#### Returns

`void`

***

### start()?

> `optional` **start**(): `Promise`\<`void`\>

Defined in: [core/coreTypes.ts:20](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L20)

Start the app
Called after Electron app ready

#### Returns

`Promise`\<`void`\>

***

### stop()?

> `optional` **stop**(): `Promise`\<`void`\>

Defined in: [core/coreTypes.ts:25](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L25)

Stop the app
Called when app is quitting

#### Returns

`Promise`\<`void`\>
