[**CIA Compliance Manager — Markdown Documentation v1.1.40**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / safeAccess

# Variable: safeAccess

> **safeAccess**: \<`T`\>(`obj`, `path`, `defaultValue?`) => `T`

Defined in: [utils/index.ts:222](https://github.com/Hack23/cia-compliance-manager/blob/99a6b37a19b77a1865b964d905f60cd756167ae2/src/utils/index.ts#L222)

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
