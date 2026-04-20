[**CIA Compliance Manager — Markdown Documentation v1.1.54**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / meetsContrastRequirement

# Function: meetsContrastRequirement()

> **meetsContrastRequirement**(`foreground`, `background`, `isLargeText?`): `boolean`

Defined in: [utils/accessibility.ts:585](https://github.com/Hack23/cia-compliance-manager/blob/ec53446d20ff3941e43c6f67d15ff98cb084ddbd/src/utils/accessibility.ts#L585)

Check if element has sufficient color contrast
Note: This is a simplified check. Use dedicated tools for comprehensive testing.

## Parameters

### foreground

`string`

Foreground color (hex)

### background

`string`

Background color (hex)

### isLargeText?

`boolean` = `false`

Whether text is large (18pt+ or 14pt+ bold)

## Returns

`boolean`

Whether contrast meets WCAG AA standards

## Throws

Error if colors are invalid hex values
