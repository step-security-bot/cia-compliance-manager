[**CIA Compliance Manager — UML Diagrams v1.1.81**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/complianceConstants](../README.md) / getRequiredSecurityLevel

# Function: getRequiredSecurityLevel()

> **getRequiredSecurityLevel**(`framework`, `component`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [constants/complianceConstants.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/8fa41915ca9153d5689c4d663292dcfd3d6de4ad/src/constants/complianceConstants.ts#L238)

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
