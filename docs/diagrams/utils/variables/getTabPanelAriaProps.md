[**CIA Compliance Manager — UML Diagrams v1.1.88**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / getTabPanelAriaProps

# Variable: getTabPanelAriaProps

> **getTabPanelAriaProps**: (`id`, `labelledBy`, `isHidden`) => `object`

Defined in: [utils/index.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/utils/index.ts#L34)

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
