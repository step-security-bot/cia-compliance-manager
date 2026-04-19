[**CIA Compliance Manager — UML Diagrams v1.1.53**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getRecommendedBudgetAllocation

# Variable: getRecommendedBudgetAllocation

> **getRecommendedBudgetAllocation**: (`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Defined in: [utils/index.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/21b7c0f56334578902f2a0b9e3a8ba680378a873/src/utils/index.ts#L83)

Get recommended budget allocation based on security levels

## Parameters

### totalBudget

`number`

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

## Returns

`object`

### availability

> **availability**: `number`

### integrity

> **integrity**: `number`

### confidentiality

> **confidentiality**: `number`
