[**CIA Compliance Manager — UML Diagrams v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getSelectAriaProps

# Function: getSelectAriaProps()

> **getSelectAriaProps**(`label`, `value`, `required?`): `object`

Defined in: [utils/accessibility.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/accessibility.ts#L297)

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
