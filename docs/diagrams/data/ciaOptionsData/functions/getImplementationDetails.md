[**CIA Compliance Manager — UML Diagrams v1.1.59**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getImplementationDetails

# Function: getImplementationDetails()

> **getImplementationDetails**(`component`, `level`): `object`

Defined in: [data/ciaOptionsData.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/data/ciaOptionsData.ts#L335)

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
