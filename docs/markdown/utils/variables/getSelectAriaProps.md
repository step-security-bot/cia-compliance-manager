[**CIA Compliance Manager — Markdown Documentation v1.1.34**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getSelectAriaProps

# Variable: getSelectAriaProps

> **getSelectAriaProps**: (`label`, `value`, `required`) => `object`

Defined in: [utils/index.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/93d28e2dddb40364acafb5aab5b0a96fcc590cc8/src/utils/index.ts#L42)

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
