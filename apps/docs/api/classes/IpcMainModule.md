[**CF Electron Framework**](../README.md)

***

# Class: IpcMainModule

Defined in: [ipc/ipcMainModule.ts:6](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L6)

## Implements

- [`AppModule`](../interfaces/AppModule.md)

## Constructors

### Constructor

> **new IpcMainModule**(): `IpcMainModule`

#### Returns

`IpcMainModule`

## Methods

### register()

> **register**(`_`): `void`

Defined in: [ipc/ipcMainModule.ts:9](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L9)

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

Defined in: [ipc/ipcMainModule.ts:18](https://github.com/hafht/cf-electron/blob/main/packages/core/src/ipc/ipcMainModule.ts#L18)

Stop the app
Called when app is quitting

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`stop`](../interfaces/AppModule.md#stop)
