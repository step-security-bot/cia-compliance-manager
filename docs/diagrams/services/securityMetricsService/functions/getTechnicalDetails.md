[**CIA Compliance Manager — UML Diagrams v1.1.90**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getTechnicalDetails

# Function: getTechnicalDetails()

> **getTechnicalDetails**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`TechnicalDetailsResponse`](../interfaces/TechnicalDetailsResponse.md)\>

Defined in: [services/securityMetricsService.ts:1506](https://github.com/Hack23/cia-compliance-manager/blob/b8338d711d47ba3fba3fa9866890e62875eaca63/src/services/securityMetricsService.ts#L1506)

Get technical details based on security levels

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

`Promise`\<[`TechnicalDetailsResponse`](../interfaces/TechnicalDetailsResponse.md)\>

Technical details
