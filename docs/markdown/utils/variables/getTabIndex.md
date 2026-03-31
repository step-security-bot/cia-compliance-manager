[**CIA Compliance Manager — Markdown Documentation v1.1.42**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getTabIndex

# Variable: getTabIndex

> **getTabIndex**: (`isInteractive`, `isDisabled`) => `number` \| `undefined`

Defined in: [utils/index.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/ce3ecc4a3b34e88099c2e6d497b15097021e223f/src/utils/index.ts#L46)

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
