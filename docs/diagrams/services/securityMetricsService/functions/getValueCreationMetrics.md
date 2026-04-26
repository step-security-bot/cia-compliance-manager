[**CIA Compliance Manager — UML Diagrams v1.1.59**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / getValueCreationMetrics

# Function: getValueCreationMetrics()

> **getValueCreationMetrics**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`ValueCreationMetrics`](../interfaces/ValueCreationMetrics.md)\>

Defined in: [services/securityMetricsService.ts:1417](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/services/securityMetricsService.ts#L1417)

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
