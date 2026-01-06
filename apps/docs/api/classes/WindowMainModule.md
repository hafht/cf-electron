[**CF Electron Framework**](../README.md)

***

# Class: WindowMainModule

Defined in: [window/windowMainModule.ts:8](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L8)

Base interface for all Electron app modules.
Modules must implement the disposable pattern to properly clean up resources.

## Extends

- `Disposable`

## Implements

- [`AppModule`](../interfaces/AppModule.md)

## Constructors

### Constructor

> **new WindowMainModule**(`options`): `WindowMainModule`

Defined in: [window/windowMainModule.ts:11](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L11)

#### Parameters

##### options

[`WindowOptions`](../interfaces/WindowOptions.md)

#### Returns

`WindowMainModule`

#### Overrides

`Disposable.constructor`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [window/windowMainModule.ts:56](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L56)

Dispose of all registered resources.
Safe to call multiple times - will only dispose once.

#### Returns

`void`

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`dispose`](../interfaces/AppModule.md#dispose)

#### Overrides

`Disposable.dispose`

***

### register()

> **register**(`_container`): `void`

Defined in: [window/windowMainModule.ts:15](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L15)

Register dependencies & handler
Called before Electron app ready

#### Parameters

##### \_container

`Container`

#### Returns

`void`

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`register`](../interfaces/AppModule.md#register)

***

### start()

> **start**(): `Promise`\<`void`\>

Defined in: [window/windowMainModule.ts:19](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L19)

Start the app
Called after Electron app ready

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`start`](../interfaces/AppModule.md#start)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [window/windowMainModule.ts:52](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L52)

Stop the app
Called when app is quitting

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`stop`](../interfaces/AppModule.md#stop)
