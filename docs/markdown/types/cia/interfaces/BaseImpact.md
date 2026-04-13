[**CIA Compliance Manager — Markdown Documentation v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/types/cia.ts#L343)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/types/cia.ts#L345)

Security level associated with this impact

***

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/types/cia.ts#L348)

Human-readable description of the impact
