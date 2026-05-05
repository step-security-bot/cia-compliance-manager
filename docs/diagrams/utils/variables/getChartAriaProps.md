[**CIA Compliance Manager — UML Diagrams v1.1.64**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getChartAriaProps

# Variable: getChartAriaProps

> **getChartAriaProps**: (`label`, `description`, `descriptionId?`) => `object`

Defined in: [utils/index.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/utils/index.ts#L45)

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
