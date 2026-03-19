[**CIA Compliance Manager — UML Diagrams v1.1.33**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/costCalculationUtils](../README.md) / calculateTotalSecurityCost

# Function: calculateTotalSecurityCost()

> **calculateTotalSecurityCost**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`, `orgSize?`, `industry?`): `object`

Defined in: [utils/costCalculationUtils.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/94f5ebbb955e20e7ecd8df8e067b2edac2a859ae/src/utils/costCalculationUtils.ts#L116)

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

> **availabilityCost**: `CostResult`

### integrityCost

> **integrityCost**: `CostResult`

### confidentialityCost

> **confidentialityCost**: `CostResult`

### totalCapex

> **totalCapex**: `number`

### totalOpex

> **totalOpex**: `number`

### totalCost

> **totalCost**: `number`
