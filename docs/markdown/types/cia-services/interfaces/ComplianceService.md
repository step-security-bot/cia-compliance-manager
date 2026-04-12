[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / ComplianceService

# Interface: ComplianceService

Defined in: [types/cia-services.ts:415](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/types/cia-services.ts#L415)

Compliance Service interface
Defines methods for compliance status and framework checks

## Properties

### getComplianceStatus?

> `optional` **getComplianceStatus?**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`ComplianceStatus`](ComplianceStatus.md) \| `null`

Defined in: [types/cia-services.ts:416](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/types/cia-services.ts#L416)

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatus`](ComplianceStatus.md) \| `null`
