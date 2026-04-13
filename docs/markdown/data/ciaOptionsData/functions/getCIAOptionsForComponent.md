[**CIA Compliance Manager — Markdown Documentation v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [data/ciaOptionsData](../README.md) / getCIAOptionsForComponent

# Function: getCIAOptionsForComponent()

> **getCIAOptionsForComponent**(`component`): `Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Defined in: [data/ciaOptionsData.ts:313](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/data/ciaOptionsData.ts#L313)

Get CIA options for a specific component

## Parameters

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

The CIA component to get options for

## Returns

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)\>

Record of security levels and their details
