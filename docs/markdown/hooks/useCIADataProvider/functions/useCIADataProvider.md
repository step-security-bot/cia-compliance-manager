[**CIA Compliance Manager — Markdown Documentation v1.1.56**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useCIADataProvider](../README.md) / useCIADataProvider

# Function: useCIADataProvider()

> **useCIADataProvider**(): `object`

Defined in: [hooks/useCIADataProvider.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/947de98b1b44a8456f3ca81571083fd214d2e336/src/hooks/useCIADataProvider.ts#L9)

Hook that provides access to the CIA data provider

## Returns

`object`

An object containing the data provider, loading state, and error

### dataProvider

> **dataProvider**: [`CIADataProvider`](../../../types/cia-services/interfaces/CIADataProvider.md) \| `null`

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refreshDataProvider

> **refreshDataProvider**: () => `Promise`\<`void`\> = `initDataProvider`

#### Returns

`Promise`\<`void`\>
