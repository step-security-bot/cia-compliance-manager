[**CIA Compliance Manager — Markdown Documentation v1.1.89**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useCIADataProvider](../README.md) / useCIADataProvider

# Function: useCIADataProvider()

> **useCIADataProvider**(): `object`

Defined in: [hooks/useCIADataProvider.ts:9](https://github.com/Hack23/cia-compliance-manager/blob/0ccfae8ee114f5804bb25f89f2d1de1e1af26e3b/src/hooks/useCIADataProvider.ts#L9)

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
