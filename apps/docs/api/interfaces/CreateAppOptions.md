[**CF Electron Framework**](../README.md)

***

# Interface: CreateAppOptions

Defined in: [core/coreTypes.ts:37](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L37)

Options for creating an Electron app

## Properties

### appId

> **appId**: `string`

Defined in: [core/coreTypes.ts:38](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L38)

***

### appName?

> `optional` **appName**: `string`

Defined in: [core/coreTypes.ts:43](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L43)

The name of the app (optional). Fallback to appId if not provided

#### Default

```ts
undefined
```

***

### config?

> `optional` **config**: `unknown`

Defined in: [core/coreTypes.ts:47](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L47)

The configuration for the app

***

### modules?

> `optional` **modules**: [`AppModule`](AppModule.md)[]

Defined in: [core/coreTypes.ts:51](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L51)

The modules for the app
