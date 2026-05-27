[**CIA Compliance Manager — Markdown Documentation v1.1.80**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / getSecurityLevelOption

# Function: getSecurityLevelOption()

> **getSecurityLevelOption**\<`T`\>(`options`, `key`): `T` \| `undefined`

Defined in: [utils/typeGuards.ts:219](https://github.com/Hack23/cia-compliance-manager/blob/31b40525874d6d3a1bd6045dfd29f1e237e01fe5/src/utils/typeGuards.ts#L219)

Helper function to safely access CIA options with string keys

## Type Parameters

### T

`T`

## Parameters

### options

`Record`\<[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md), `T`\>

The options object to access

### key

`string` \| `undefined`

The string key that should be treated as SecurityLevel

## Returns

`T` \| `undefined`

The option value or undefined if not found
