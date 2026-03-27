[**CIA Compliance Manager — Markdown Documentation v1.1.40**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityResources

# Function: getSecurityResources()

> **getSecurityResources**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<`Record`\<`string`, `unknown`\>\>

Defined in: [services/securityMetricsService.ts:1586](https://github.com/Hack23/cia-compliance-manager/blob/99a6b37a19b77a1865b964d905f60cd756167ae2/src/services/securityMetricsService.ts#L1586)

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
