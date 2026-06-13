[**CIA Compliance Manager — Markdown Documentation v1.1.89**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getSelectAriaProps

# Variable: getSelectAriaProps

> **getSelectAriaProps**: (`label`, `value`, `required`) => `object`

Defined in: [utils/index.ts:36](https://github.com/Hack23/cia-compliance-manager/blob/0ccfae8ee114f5804bb25f89f2d1de1e1af26e3b/src/utils/index.ts#L36)

Generate ARIA props for a select/dropdown component

## Parameters

### label

`string`

Select label

### value

`string`

Current value

### required?

`boolean` = `false`

Whether selection is required

## Returns

`object`

ARIA props object

### aria-label

> **aria-label**: `string`

### aria-required?

> `optional` **aria-required?**: `boolean`

### aria-describedby?

> `optional` **aria-describedby?**: `string`
