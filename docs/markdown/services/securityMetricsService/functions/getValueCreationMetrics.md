[**CIA Compliance Manager — Markdown Documentation v1.1.53**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / getValueCreationMetrics

# Function: getValueCreationMetrics()

> **getValueCreationMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`ValueCreationMetrics`](../interfaces/ValueCreationMetrics.md)\>

Defined in: [services/securityMetricsService.ts:1417](https://github.com/Hack23/cia-compliance-manager/blob/21b7c0f56334578902f2a0b9e3a8ba680378a873/src/services/securityMetricsService.ts#L1417)

Get value creation metrics based on security levels

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

`Promise`\<[`ValueCreationMetrics`](../interfaces/ValueCreationMetrics.md)\>

Value creation metrics
