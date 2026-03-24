[**CIA Compliance Manager — UML Diagrams v1.1.36**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getDefaultComponentImpact

# Function: getDefaultComponentImpact()

> **getDefaultComponentImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [utils/riskUtils.ts:514](https://github.com/Hack23/cia-compliance-manager/blob/619a0e78ce14948ed535761186ab2648d596a7bd/src/utils/riskUtils.ts#L514)

Generates default component impact data when service data isn't available

## Parameters

### component

`string`

The security component: 'availability', 'integrity', or 'confidentiality'

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The security level of the component

## Returns

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Default impact details for the component
