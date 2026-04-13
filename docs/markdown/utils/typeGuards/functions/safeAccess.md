[**CIA Compliance Manager — Markdown Documentation v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / safeAccess

# Function: safeAccess()

> **safeAccess**\<`T`\>(`obj`, `path`, `defaultValue?`): `T`

Defined in: [utils/typeGuards.ts:160](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/utils/typeGuards.ts#L160)

Safely access a nested property in an object using a dot notation path

## Type Parameters

### T

`T` = `unknown`

## Parameters

### obj

`unknown`

The object to access

### path

`string` \| (`string` \| `number`)[]

The path to the property, e.g. 'a.b.c' or 'a[0].b.c'

### defaultValue?

`T`

The default value to return if the property doesn't exist

## Returns

`T`

The value at the path or the default value
