[**CF Electron Framework**](../README.md)

***

# Class: AppConfigModule\<T\>

Defined in: [config/appConfigModule.ts:6](https://github.com/hafht/cf-electron/blob/main/packages/core/src/config/appConfigModule.ts#L6)

## Type Parameters

### T

`T`

## Implements

- [`AppModule`](../interfaces/AppModule.md)

## Constructors

### Constructor

> **new AppConfigModule**\<`T`\>(`input`): `AppConfigModule`\<`T`\>

Defined in: [config/appConfigModule.ts:7](https://github.com/hafht/cf-electron/blob/main/packages/core/src/config/appConfigModule.ts#L7)

#### Parameters

##### input

[`AppConfigInput`](../interfaces/AppConfigInput.md)\<`T`\>

#### Returns

`AppConfigModule`\<`T`\>

## Methods

### register()

> **register**(`container`): `void`

Defined in: [config/appConfigModule.ts:9](https://github.com/hafht/cf-electron/blob/main/packages/core/src/config/appConfigModule.ts#L9)

Register dependencies & handler
Called before Electron app ready

#### Parameters

##### container

`Container`

#### Returns

`void`

#### Implementation of

[`AppModule`](../interfaces/AppModule.md).[`register`](../interfaces/AppModule.md#register)
