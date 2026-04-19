[**CIA Compliance Manager — Markdown Documentation v1.1.53**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / toSecurityLevel

# Function: toSecurityLevel()

> **toSecurityLevel**(`value`, `fallback?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/typeGuards.ts:932](https://github.com/Hack23/cia-compliance-manager/blob/21b7c0f56334578902f2a0b9e3a8ba680378a873/src/utils/typeGuards.ts#L932)

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
