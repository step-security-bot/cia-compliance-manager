[**CIA Compliance Manager — Markdown Documentation v1.1.75**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / BaseImpact

# Interface: BaseImpact

Defined in: [types/cia.ts:338](https://github.com/Hack23/cia-compliance-manager/blob/a6c7db5280f5aeb6cc66c1125f8c3d523ae00a40/src/types/cia.ts#L338)

Base interface for CIA impacts

Common structure shared by all CIA component impact types.

## Extended by

- [`AvailabilityImpact`](AvailabilityImpact.md)
- [`IntegrityImpact`](IntegrityImpact.md)
- [`ConfidentialityImpact`](ConfidentialityImpact.md)

## Properties

### level

> **level**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:340](https://github.com/Hack23/cia-compliance-manager/blob/a6c7db5280f5aeb6cc66c1125f8c3d523ae00a40/src/types/cia.ts#L340)

Security level associated with this impact

***

### description

> **description**: `string`

Defined in: [types/cia.ts:343](https://github.com/Hack23/cia-compliance-manager/blob/a6c7db5280f5aeb6cc66c1125f8c3d523ae00a40/src/types/cia.ts#L343)

Human-readable description of the impact
