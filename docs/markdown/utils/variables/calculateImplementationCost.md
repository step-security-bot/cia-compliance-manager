[**CIA Compliance Manager — Markdown Documentation v1.1.51**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateImplementationCost

# Variable: calculateImplementationCost

> **calculateImplementationCost**: (`securityLevel`, `orgSize`, `industry`) => [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

Defined in: [utils/index.ts:80](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/utils/index.ts#L80)

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
