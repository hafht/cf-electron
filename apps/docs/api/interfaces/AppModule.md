[**CF Electron Framework**](../README.md)

***

# Interface: AppModule

Defined in: [core/coreTypes.ts:5](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L5)

## Methods

### register()

> **register**(`container`): `void`

Defined in: [core/coreTypes.ts:10](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L10)

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

Defined in: [core/coreTypes.ts:15](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L15)

Start the app
Called after Electron app ready

#### Returns

`Promise`\<`void`\>

***

### stop()?

> `optional` **stop**(): `Promise`\<`void`\>

Defined in: [core/coreTypes.ts:20](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L20)

Stop the app
Called when app is quitting

#### Returns

`Promise`\<`void`\>
