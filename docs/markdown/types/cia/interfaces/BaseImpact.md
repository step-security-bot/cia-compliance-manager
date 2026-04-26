[**CIA Compliance Manager — Markdown Documentation v1.1.59**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L343)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L345)

Security level associated with this impact

***

### description

> **description**: `string`

Defined in: [types/cia.ts:348](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L348)

Human-readable description of the impact
