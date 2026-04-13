[**CIA Compliance Manager — UML Diagrams v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/complianceConstants](../README.md) / getRequiredSecurityLevel

# Function: getRequiredSecurityLevel()

> **getRequiredSecurityLevel**(`framework`, `component`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [constants/complianceConstants.ts:242](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/constants/complianceConstants.ts#L242)

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
