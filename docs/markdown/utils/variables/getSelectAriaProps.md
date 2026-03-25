[**CIA Compliance Manager — Markdown Documentation v1.1.39**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getSelectAriaProps

# Variable: getSelectAriaProps

> **getSelectAriaProps**: (`label`, `value`, `required`) => `object`

Defined in: [utils/index.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/utils/index.ts#L42)

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
