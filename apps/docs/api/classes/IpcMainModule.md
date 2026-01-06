[**CF Electron Framework**](../README.md)

***

# Class: IpcMainModule

Defined in: [ipc/ipcMainModule.ts:7](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L7)

Base interface for all Electron app modules.
Modules must implement the disposable pattern to properly clean up resources.

## Extends

- `Disposable`

## Implements

- [`AppModule`](../interfaces/AppModule.md)

## Constructors

### Constructor

> **new IpcMainModule**(): `IpcMainModule`

Defined in: [ipc/ipcMainModule.ts:10](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L10)

#### Returns

`IpcMainModule`

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

> **register**(`_`): `void`

Defined in: [ipc/ipcMainModule.ts:15](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L15)

Register dependencies & handler
Called before Electron app ready

#### Parameters

##### \_

`Container`

#### Returns

`void`

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`register`](../interfaces/AppModule.md#register)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [ipc/ipcMainModule.ts:24](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L24)

Stop the app
Called when app is quitting

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`stop`](../interfaces/AppModule.md#stop)
