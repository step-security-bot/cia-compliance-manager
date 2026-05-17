[**CIA Compliance Manager — Markdown Documentation v1.1.75**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / getTabPanelAriaProps

# Function: getTabPanelAriaProps()

> **getTabPanelAriaProps**(`id`, `labelledBy`, `isHidden`): `object`

Defined in: [utils/accessibility.ts:205](https://github.com/Hack23/cia-compliance-manager/blob/a6c7db5280f5aeb6cc66c1125f8c3d523ae00a40/src/utils/accessibility.ts#L205)

Generate ARIA props for a tab panel

## Parameters

### id

`string`

Panel identifier

### labelledBy

`string`

ID of the tab that labels this panel

### isHidden

`boolean`

Whether the panel is currently hidden

## Returns

`object`

ARIA props object

### role

> **role**: `string`

### id

> **id**: `string`

### aria-labelledby

> **aria-labelledby**: `string`

### hidden?

> `optional` **hidden?**: `boolean`

### tabIndex

> **tabIndex**: `number`
