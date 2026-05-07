[**CIA Compliance Manager — UML Diagrams v1.1.67**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getRecommendedBudgetAllocation

# Variable: getRecommendedBudgetAllocation

> **getRecommendedBudgetAllocation**: (`totalBudget`, `availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `object`

Defined in: [utils/index.ts:83](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/utils/index.ts#L83)

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
