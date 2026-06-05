[**CIA Compliance Manager — UML Diagrams v1.1.83**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getButtonAriaProps

# Variable: getButtonAriaProps

> **getButtonAriaProps**: (`label`, `options?`) => `object`

Defined in: [utils/index.ts:35](https://github.com/Hack23/cia-compliance-manager/blob/40141afd4258e5104de6eec47ab5bf629c9b15d1/src/utils/index.ts#L35)

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
