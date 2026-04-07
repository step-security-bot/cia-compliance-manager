[**CIA Compliance Manager — UML Diagrams v1.1.47**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getButtonAriaProps

# Variable: getButtonAriaProps

> **getButtonAriaProps**: (`label`, `options?`) => `object`

Defined in: [utils/index.ts:41](https://github.com/Hack23/cia-compliance-manager/blob/0a914ff8809ea300c13e0a51b2ef582dc0e7a4a4/src/utils/index.ts#L41)

Generate ARIA props for a button

## Parameters

### label

`string`

Button label

### options?

#### isPressed?

`boolean`

#### isExpanded?

`boolean`

#### controls?

`string`

#### describedBy?

`string`

## Returns

`object`

ARIA props object

### aria-label

> **aria-label**: `string`

### aria-pressed?

> `optional` **aria-pressed?**: `boolean`

### aria-expanded?

> `optional` **aria-expanded?**: `boolean`

### aria-controls?

> `optional` **aria-controls?**: `string`

### aria-describedby?

> `optional` **aria-describedby?**: `string`
