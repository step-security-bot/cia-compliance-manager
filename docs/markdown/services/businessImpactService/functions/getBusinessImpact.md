[**CIA Compliance Manager — Markdown Documentation v1.1.43**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/businessImpactService](../README.md) / getBusinessImpact

# Function: getBusinessImpact()

> **getBusinessImpact**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`BusinessImpactDetail`](../../../types/cia-services/interfaces/BusinessImpactDetail.md)\>

Defined in: [services/businessImpactService.ts:566](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/businessImpactService.ts#L566)

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
