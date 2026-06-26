[**CIA Compliance Manager — Markdown Documentation v1.1.97**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / ComplianceService

# Interface: ComplianceService

Defined in: [types/cia-services.ts:392](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/types/cia-services.ts#L392)

Compliance Service interface
Defines methods for compliance status and framework checks

## Properties

### getComplianceStatus?

> `optional` **getComplianceStatus?**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`ComplianceStatus`](ComplianceStatus.md) \| `null`

Defined in: [types/cia-services.ts:393](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/types/cia-services.ts#L393)

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatus`](ComplianceStatus.md) \| `null`
