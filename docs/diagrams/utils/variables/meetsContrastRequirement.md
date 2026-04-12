[**CIA Compliance Manager — UML Diagrams v1.1.50**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / meetsContrastRequirement

# Variable: meetsContrastRequirement

> **meetsContrastRequirement**: (`foreground`, `background`, `isLargeText`) => `boolean`

Defined in: [utils/index.ts:50](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/index.ts#L50)

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
