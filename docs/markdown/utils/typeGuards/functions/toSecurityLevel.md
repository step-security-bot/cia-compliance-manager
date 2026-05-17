[**CIA Compliance Manager — Markdown Documentation v1.1.75**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toSecurityLevel

# Function: toSecurityLevel()

> **toSecurityLevel**(`value`, `fallback?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/typeGuards.ts:908](https://github.com/Hack23/cia-compliance-manager/blob/a6c7db5280f5aeb6cc66c1125f8c3d523ae00a40/src/utils/typeGuards.ts#L908)

Safely converts a string to a SecurityLevel, with fallback

## Parameters

### value

`unknown`

The value to convert

### fallback?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `"Moderate"`

The fallback value (defaults to "Moderate")

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

A valid SecurityLevel
