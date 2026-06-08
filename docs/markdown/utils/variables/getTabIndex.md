[**CIA Compliance Manager — Markdown Documentation v1.1.85**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getTabIndex

# Variable: getTabIndex

> **getTabIndex**: (`isInteractive`, `isDisabled`) => `number` \| `undefined`

Defined in: [utils/index.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/612cf447fc0534e6658cb45923adb133997d9d57/src/utils/index.ts#L40)

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
