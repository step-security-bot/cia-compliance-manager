[**CIA Compliance Manager — Markdown Documentation v1.1.37**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getStatusAriaProps

# Variable: getStatusAriaProps

> **getStatusAriaProps**: (`message`, `politeness`) => `object`

Defined in: [utils/index.ts:44](https://github.com/Hack23/cia-compliance-manager/blob/4c8200b5bddf128916a299baf22a27cf745941c8/src/utils/index.ts#L44)

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
