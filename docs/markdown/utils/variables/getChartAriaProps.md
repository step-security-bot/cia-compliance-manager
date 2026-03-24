[**CIA Compliance Manager — Markdown Documentation v1.1.38**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getChartAriaProps

# Variable: getChartAriaProps

> **getChartAriaProps**: (`label`, `description`, `descriptionId?`) => `object`

Defined in: [utils/index.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/e53f32b24281901e3964b603dea2bfa4c23bab48/src/utils/index.ts#L45)

Generate ARIA props for a chart/visualization

## Parameters

### label

`string`

Chart label

### description

`string`

Detailed chart description

### descriptionId?

`string`

ID of element containing description

## Returns

`object`

ARIA props object

### aria-label

> **aria-label**: `string`

### aria-describedby?

> `optional` **aria-describedby?**: `string`

### role

> **role**: `string`
