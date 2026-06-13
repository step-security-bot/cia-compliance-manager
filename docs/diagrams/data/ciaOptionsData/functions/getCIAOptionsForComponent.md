[**CIA Compliance Manager — UML Diagrams v1.1.89**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/ciaOptionsData](../README.md) / getCIAOptionsForComponent

# Function: getCIAOptionsForComponent()

> **getCIAOptionsForComponent**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Defined in: [data/ciaOptionsData.ts:309](https://github.com/Hack23/cia-compliance-manager/blob/0ccfae8ee114f5804bb25f89f2d1de1e1af26e3b/src/data/ciaOptionsData.ts#L309)

Get CIA options for a specific component

## Parameters

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

The CIA component to get options for

## Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Record of security levels and their details
