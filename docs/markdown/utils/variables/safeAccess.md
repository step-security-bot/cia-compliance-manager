[**CIA Compliance Manager — Markdown Documentation v1.1.102**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / safeAccess

# Variable: safeAccess

> **safeAccess**: \<`T`\>(`obj`, `path`, `defaultValue?`) => `T`

Defined in: [utils/index.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/bfb8c9fef6315cdabac68419a9744b7771c7d28c/src/utils/index.ts#L203)

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
