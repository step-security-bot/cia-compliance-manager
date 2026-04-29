[**CIA Compliance Manager — UML Diagrams v1.1.61**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/businessImpact](../README.md) / BusinessConsideration

# Interface: BusinessConsideration

Defined in: [types/businessImpact.ts:94](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L94)

Business consideration structure

## Properties

### type

> **type**: `"risk"` \| `"opportunity"` \| `"requirement"`

Defined in: [types/businessImpact.ts:96](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L96)

Type of consideration

***

### title

> **title**: `string`

Defined in: [types/businessImpact.ts:99](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L99)

Title of the consideration

***

### description

> **description**: `string`

Defined in: [types/businessImpact.ts:102](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L102)

Description of the consideration

***

### importance

> **importance**: `"low"` \| `"high"` \| `"medium"` \| `"critical"`

Defined in: [types/businessImpact.ts:105](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L105)

Impact level or importance

***

### businessArea

> **businessArea**: `string`

Defined in: [types/businessImpact.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L108)

Related business area

***

### financialImpact?

> `optional` **financialImpact?**: `string`

Defined in: [types/businessImpact.ts:111](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/businessImpact.ts#L111)

Estimated financial impact
