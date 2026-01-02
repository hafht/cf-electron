[**CF Electron Framework**](../README.md)

***

# Class: WindowMainModule

Defined in: [window/windowMainModule.ts:7](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L7)

## Implements

- [`AppModule`](../interfaces/AppModule.md)

## Constructors

### Constructor

> **new WindowMainModule**(`options`): `WindowMainModule`

Defined in: [window/windowMainModule.ts:10](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L10)

#### Parameters

##### options

[`WindowOptions`](../interfaces/WindowOptions.md)

#### Returns

`WindowMainModule`

## Methods

### register()

> **register**(`_container`): `void`

Defined in: [window/windowMainModule.ts:12](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L12)

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

Defined in: [window/windowMainModule.ts:16](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L16)

Start the app
Called after Electron app ready

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`start`](../interfaces/AppModule.md#start)

***

### stop()

> **stop**(): `Promise`\<`void`\>

Defined in: [window/windowMainModule.ts:49](https://github.com/hafht/cf-electron/blob/main/packages/core/src/window/windowMainModule.ts#L49)

Stop the app
Called when app is quitting

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`stop`](../interfaces/AppModule.md#stop)
