[**CIA Compliance Manager — UML Diagrams v1.1.69**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/b616fbaa2bb30d924b7315cd583f8328bb70f347/src/utils/index.ts#L44)

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
