[**CIA Compliance Manager — UML Diagrams v1.1.79**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getStatusAriaProps

# Function: getStatusAriaProps()

> **getStatusAriaProps**(`message`, `politeness?`): `object`

Defined in: [utils/accessibility.ts:374](https://github.com/Hack23/cia-compliance-manager/blob/a9ec77027ad49f5e9db798a4850ca95226a2431e/src/utils/accessibility.ts#L374)

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
