[**CIA Compliance Manager — UML Diagrams v1.1.53**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getTabPanelAriaProps

# Variable: getTabPanelAriaProps

> **getTabPanelAriaProps**: (`id`, `labelledBy`, `isHidden`) => `object`

Defined in: [utils/index.ts:40](https://github.com/Hack23/cia-compliance-manager/blob/21b7c0f56334578902f2a0b9e3a8ba680378a873/src/utils/index.ts#L40)

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
