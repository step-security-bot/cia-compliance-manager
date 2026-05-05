[**CIA Compliance Manager — Markdown Documentation v1.1.65**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateTotalSecurityCost

# Function: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize?`, `industry?`): `object`

Defined in: [utils/costCalculationUtils.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/77dc8b893bfd5ae3bdbf0f6fc651128f655bd7a7/src/utils/costCalculationUtils.ts#L116)

Calculate total security costs across all CIA components

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

### orgSize?

[`OrganizationSize`](../type-aliases/OrganizationSize.md) = `"medium"`

### industry?

[`Industry`](../type-aliases/Industry.md) = `"general"`

## Returns

`object`

### availabilityCost

> **availabilityCost**: [`CostResult`](../interfaces/CostResult.md)

### integrityCost

> **integrityCost**: [`CostResult`](../interfaces/CostResult.md)

### confidentialityCost

> **confidentialityCost**: [`CostResult`](../interfaces/CostResult.md)

### totalCapex

> **totalCapex**: `number`

### totalOpex

> **totalOpex**: `number`

### totalCost

> **totalCost**: `number`
