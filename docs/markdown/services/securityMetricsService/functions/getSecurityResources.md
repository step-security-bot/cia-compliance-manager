[**CIA Compliance Manager — Markdown Documentation v1.1.98**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityResources

# Function: getSecurityResources()

> **getSecurityResources**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [services/securityMetricsService.ts:1581](https://github.com/Hack23/cia-compliance-manager/blob/2f201a728b15b42b9d8c9bebf9ed16f5d9c05e5e/src/services/securityMetricsService.ts#L1581)

Get security resources based on security levels

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

`Promise`\<`Record`\<`string`, `unknown`\>\>

Security resources
