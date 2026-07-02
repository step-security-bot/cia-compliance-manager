[**CIA Compliance Manager — Markdown Documentation v1.1.101**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / calculateTotalSecurityCost

# Variable: calculateTotalSecurityCost

> **calculateTotalSecurityCost**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize`, `industry`) => `object`

Defined in: [utils/index.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/6723306427ccc04dd3d118787ac833aded0c707b/src/utils/index.ts#L72)

Calculate total security costs across all CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

### orgSize?

[`OrganizationSize`](../costCalculationUtils/type-aliases/OrganizationSize.md) = `"medium"`

### industry?

[`Industry`](../costCalculationUtils/type-aliases/Industry.md) = `"general"`

## Returns

`object`

### availabilityCost

> **availabilityCost**: [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

### integrityCost

> **integrityCost**: [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

### confidentialityCost

> **confidentialityCost**: [`CostResult`](../costCalculationUtils/interfaces/CostResult.md)

### totalCapex

> **totalCapex**: `number`

### totalOpex

> **totalOpex**: `number`

### totalCost

> **totalCost**: `number`
