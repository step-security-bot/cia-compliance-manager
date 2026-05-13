[**CIA Compliance Manager — UML Diagrams v1.1.72**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / getTabIndex

# Function: getTabIndex()

> **getTabIndex**(`isInteractive`, `isDisabled?`): `number` \| `undefined`

Defined in: [utils/accessibility.ts:429](https://github.com/Hack23/cia-compliance-manager/blob/b1e3e6a4b46e82b2bf6550c217205c9e138cce5a/src/utils/accessibility.ts#L429)

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
