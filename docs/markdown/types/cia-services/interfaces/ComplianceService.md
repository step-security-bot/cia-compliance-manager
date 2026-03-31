[**CIA Compliance Manager — Markdown Documentation v1.1.42**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / ComplianceService

# Interface: ComplianceService

Defined in: [types/cia-services.ts:415](https://github.com/Hack23/cia-compliance-manager/blob/ce3ecc4a3b34e88099c2e6d497b15097021e223f/src/types/cia-services.ts#L415)

Compliance Service interface
Defines methods for compliance status and framework checks

## Properties

### getComplianceStatus?

> `optional` **getComplianceStatus?**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`ComplianceStatus`](ComplianceStatus.md) \| `null`

Defined in: [types/cia-services.ts:416](https://github.com/Hack23/cia-compliance-manager/blob/ce3ecc4a3b34e88099c2e6d497b15097021e223f/src/types/cia-services.ts#L416)

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatus`](ComplianceStatus.md) \| `null`
