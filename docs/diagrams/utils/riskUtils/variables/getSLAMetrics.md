[**CIA Compliance Manager — UML Diagrams v1.1.34**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getSLAMetrics

# Variable: getSLAMetrics

> `const` **getSLAMetrics**: (`level`) => `object` = `getDefaultSLAMetrics`

Defined in: [utils/riskUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/93d28e2dddb40364acafb5aab5b0a96fcc590cc8/src/utils/riskUtils.ts#L31)

Get default SLA metrics for a security level

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

`object`

SLA metrics object

### uptime

> **uptime**: `string`

### rto

> **rto**: `string`

### rpo

> **rpo**: `string`

### mttr

> **mttr**: `string`

### sla

> **sla**: `string`
