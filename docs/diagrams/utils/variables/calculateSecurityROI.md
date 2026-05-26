[**CIA Compliance Manager — UML Diagrams v1.1.79**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateSecurityROI

# Variable: calculateSecurityROI

> **calculateSecurityROI**: (`securityCost`, `riskReductionPercent`, `potentialLoss`, `timeframeYears`) => `object`

Defined in: [utils/index.ts:73](https://github.com/Hack23/cia-compliance-manager/blob/a9ec77027ad49f5e9db798a4850ca95226a2431e/src/utils/index.ts#L73)

Calculate security ROI

## Parameters

### securityCost

`number`

### riskReductionPercent

`number`

### potentialLoss

`number`

### timeframeYears?

`number` = `3`

## Returns

`object`

### roi

> **roi**: `number`

### roiPercentage

> **roiPercentage**: `string`

### paybackPeriodMonths

> **paybackPeriodMonths**: `number`

### costAvoidance

> **costAvoidance**: `number`
