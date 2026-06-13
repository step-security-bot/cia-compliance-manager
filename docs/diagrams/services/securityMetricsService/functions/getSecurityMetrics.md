[**CIA Compliance Manager — UML Diagrams v1.1.89**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getSecurityMetrics

# Function: getSecurityMetrics()

> **getSecurityMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`SecurityMetrics`](../interfaces/SecurityMetrics.md)\>

Defined in: [services/securityMetricsService.ts:1482](https://github.com/Hack23/cia-compliance-manager/blob/0ccfae8ee114f5804bb25f89f2d1de1e1af26e3b/src/services/securityMetricsService.ts#L1482)

Get security metrics based on security levels

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

`Promise`\<[`SecurityMetrics`](../interfaces/SecurityMetrics.md)\>

Security metrics
