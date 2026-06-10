[**CIA Compliance Manager — Markdown Documentation v1.1.86**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [constants/complianceConstants](../README.md) / getRequiredSecurityLevel

# Function: getRequiredSecurityLevel()

> **getRequiredSecurityLevel**(`framework`, `component`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [constants/complianceConstants.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/constants/complianceConstants.ts#L238)

Get the required security level for a specific framework and component

## Parameters

### framework

`string`

Compliance framework

### component

`"confidentiality"` \| `"integrity"` \| `"availability"`

CIA component

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Required security level
