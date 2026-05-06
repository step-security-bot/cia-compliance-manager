[**CIA Compliance Manager — UML Diagrams v1.1.66**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia-services](../README.md) / ComplianceService

# Interface: ComplianceService

Defined in: [types/cia-services.ts:410](https://github.com/Hack23/cia-compliance-manager/blob/97cb56d15411f9f3fd82222df7eda6b2d578a697/src/types/cia-services.ts#L410)

Compliance Service interface
Defines methods for compliance status and framework checks

## Properties

### getComplianceStatus?

> `optional` **getComplianceStatus?**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => [`ComplianceStatus`](ComplianceStatus.md) \| `null`

Defined in: [types/cia-services.ts:411](https://github.com/Hack23/cia-compliance-manager/blob/97cb56d15411f9f3fd82222df7eda6b2d578a697/src/types/cia-services.ts#L411)

#### Parameters

##### availabilityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### integrityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

##### confidentialityLevel

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

[`ComplianceStatus`](ComplianceStatus.md) \| `null`
