[**CIA Compliance Manager — UML Diagrams v1.1.81**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getSelectAriaProps

# Function: getSelectAriaProps()

> **getSelectAriaProps**(`label`, `value`, `required?`): `object`

Defined in: [utils/accessibility.ts:297](https://github.com/Hack23/cia-compliance-manager/blob/8fa41915ca9153d5689c4d663292dcfd3d6de4ad/src/utils/accessibility.ts#L297)

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
