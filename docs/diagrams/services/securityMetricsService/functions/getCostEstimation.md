[**CIA Compliance Manager — UML Diagrams v1.1.41**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getCostEstimation

# Function: getCostEstimation()

> **getCostEstimation**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Defined in: [services/securityMetricsService.ts:1297](https://github.com/Hack23/cia-compliance-manager/blob/63d3a20253e18e09835ecdb4c858b7e023305469/src/services/securityMetricsService.ts#L1297)

Get cost estimation based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`Promise`\<[`CostEstimation`](../interfaces/CostEstimation.md)\>

Cost estimation details
