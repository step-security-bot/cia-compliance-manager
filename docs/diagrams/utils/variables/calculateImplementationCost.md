[**CIA Compliance Manager — UML Diagrams v1.1.61**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost

> **calculateImplementationCost**: (`securityLevel`, `orgSize`, `industry`) => [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

Defined in: [utils/index.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/utils/index.ts#L80)

Calculate implementation cost based on security level

## Parameters

### securityLevel

`string`

### orgSize?

[`OrganizationSize`](../costCalculationUtils/type-aliases/OrganizationSize.md) = `"medium"`

### industry?

[`Industry`](../costCalculationUtils/type-aliases/Industry.md) = `"general"`

## Returns

[`CostResult`](../costCalculationUtils/interfaces/CostResult.md)
