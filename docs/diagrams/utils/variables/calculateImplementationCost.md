[**CIA Compliance Manager — UML Diagrams v1.1.75**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost

> **calculateImplementationCost**: (`securityLevel`, `orgSize`, `industry`) => [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

Defined in: [utils/index.ts:71](https://github.com/Hack23/cia-compliance-manager/blob/a6c7db5280f5aeb6cc66c1125f8c3d523ae00a40/src/utils/index.ts#L71)

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
