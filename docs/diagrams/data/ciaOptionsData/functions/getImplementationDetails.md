[**CIA Compliance Manager — UML Diagrams v1.1.40**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/99a6b37a19b77a1865b964d905f60cd756167ae2/src/data/ciaOptionsData.ts#L335)

Get the implementation details for a specific component and level

## Parameters

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

CIA component

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

`object`

Implementation details

### effort

> **effort**: `string`

### expertise

> **expertise**: `string`

### timeframe

> **timeframe**: `string`
