[**CIA Compliance Manager — UML Diagrams v1.1.88**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / safeAccess

# Variable: safeAccess

> **safeAccess**: \<`T`\>(`obj`, `path`, `defaultValue?`) => `T`

Defined in: [utils/index.ts:203](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/utils/index.ts#L203)

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
