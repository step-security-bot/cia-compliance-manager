[**CIA Compliance Manager — Markdown Documentation v1.1.37**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getSLAMetrics

# Variable: getSLAMetrics

> `const` **getSLAMetrics**: (`level`) => `object` = `getDefaultSLAMetrics`

Defined in: [utils/riskUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/4c8200b5bddf128916a299baf22a27cf745941c8/src/utils/riskUtils.ts#L31)

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
