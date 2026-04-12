[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateRiskScore

# Variable: calculateRiskScore

> **calculateRiskScore**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `number`

Defined in: [utils/index.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/index.ts#L118)

Calculate risk score from security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`number`

Risk score (0-100)
