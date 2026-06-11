[**CIA Compliance Manager — UML Diagrams v1.1.87**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/compliance](../README.md) / ComplianceGapAnalysis

# Interface: ComplianceGapAnalysis

Defined in: [types/compliance.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/types/compliance.ts#L99)

Interface for compliance gap analysis

## Properties

### isCompliant

> **isCompliant**: `boolean`

Defined in: [types/compliance.ts:103](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/types/compliance.ts#L103)

Whether the organization is compliant with the framework

***

### gaps

> **gaps**: [`ComplianceGap`](ComplianceGap.md)[]

Defined in: [types/compliance.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/types/compliance.ts#L108)

List of compliance gaps by framework

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/compliance.ts:113](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/types/compliance.ts#L113)

Recommendations for addressing compliance gaps

***

### overallStatus?

> `optional` **overallStatus?**: `string`

Defined in: [types/compliance.ts:118](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/types/compliance.ts#L118)

Overall compliance status text

***

### complianceScore?

> `optional` **complianceScore?**: `number`

Defined in: [types/compliance.ts:123](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/types/compliance.ts#L123)

Compliance score (0-100)
