[**CIA Compliance Manager — UML Diagrams v1.1.61**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getDefaultComponentImpact

# Function: getDefaultComponentImpact()

> **getDefaultComponentImpact**(`component`, `level`): [`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Defined in: [utils/riskUtils.ts:507](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/utils/riskUtils.ts#L507)

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
