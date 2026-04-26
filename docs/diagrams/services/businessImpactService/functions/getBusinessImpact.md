[**CIA Compliance Manager — UML Diagrams v1.1.58**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/businessImpactService](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`BusinessImpactDetail`](../../../types/cia-services/interfaces/BusinessImpactDetail.md)\>

Defined in: [services/businessImpactService.ts:566](https://github.com/Hack23/cia-compliance-manager/blob/84222a9962d7a7a5e28ce024c77c70b4ccc10b90/src/services/businessImpactService.ts#L566)

Get business impact details based on security levels

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

`Promise`\<[`BusinessImpactDetail`](../../../types/cia-services/interfaces/BusinessImpactDetail.md)\>

Business impact details
