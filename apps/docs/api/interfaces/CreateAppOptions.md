[**CF Electron Framework**](../README.md)

***

# Interface: CreateAppOptions

Defined in: [core/coreTypes.ts:26](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L26)

Options for creating an Electron app

## Properties

### appId

> **appId**: `string`

Defined in: [core/coreTypes.ts:27](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L27)

***

### appName?

> `optional` **appName**: `string`

Defined in: [core/coreTypes.ts:32](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L32)

The name of the app (optional). Fallback to appId if not provided

#### Default

```ts
undefined
```

***

### config?

> `optional` **config**: `unknown`

Defined in: [core/coreTypes.ts:36](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L36)

The configuration for the app

***

### modules?

> `optional` **modules**: [`AppModule`](AppModule.md)[]

Defined in: [core/coreTypes.ts:40](https://github.com/hafht/cf-electron/blob/main/packages/core/src/core/coreTypes.ts#L40)

The modules for the app
