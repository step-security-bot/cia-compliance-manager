[**CIA Compliance Manager — Markdown Documentation v1.1.40**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / isFunction

# Function: isFunction()

> **isFunction**(`value`): `value is Function`

Defined in: [utils/typeGuards.ts:858](https://github.com/Hack23/cia-compliance-manager/blob/99a6b37a19b77a1865b964d905f60cd756167ae2/src/utils/typeGuards.ts#L858)

Type guard to check if a value is a function.
Note: `typeof` returns "function" for both callables and class constructors,
so the `Function` type is the correct predicate here.

## Parameters

### value

`unknown`

Value to check

## Returns

`value is Function`

True if the value is a function
