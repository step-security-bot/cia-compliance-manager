[**CIA Compliance Manager — Markdown Documentation v1.1.58**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getTechnicalDetails

# Function: getTechnicalDetails()

> **getTechnicalDetails**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`TechnicalDetailsResponse`](../interfaces/TechnicalDetailsResponse.md)\>

Defined in: [services/securityMetricsService.ts:1511](https://github.com/Hack23/cia-compliance-manager/blob/84222a9962d7a7a5e28ce024c77c70b4ccc10b90/src/services/securityMetricsService.ts#L1511)

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
