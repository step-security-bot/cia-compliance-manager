[**CIA Compliance Manager — UML Diagrams v1.1.85**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/612cf447fc0534e6658cb45923adb133997d9d57/src/utils/index.ts#L38)

Generate ARIA props for a status/live region

## Parameters

### message

`string`

Status message

### politeness?

`"OFF"` \| `"POLITE"` \| `"ASSERTIVE"`

ARIA live politeness level

## Returns

`object`

ARIA props object

### role

> **role**: `string`

### aria-live

> **aria-live**: `string`

### aria-atomic

> **aria-atomic**: `boolean`
