[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getTabIndex

# Function: getTabIndex()

> **getTabIndex**(`isInteractive`, `isDisabled?`): `number` \| `undefined`

Defined in: [utils/accessibility.ts:429](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/accessibility.ts#L429)

Check if an element should be keyboard focusable

## Parameters

### isInteractive

`boolean`

Whether element is interactive

### isDisabled?

`boolean` = `false`

Whether element is disabled

## Returns

`number` \| `undefined`

tabIndex value (-1, 0, or undefined)
