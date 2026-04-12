[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / handleArrowKeyNavigation

# Function: handleArrowKeyNavigation()

> **handleArrowKeyNavigation**(`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation?`): `void`

Defined in: [utils/accessibility.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/accessibility.ts#L448)

Handle keyboard navigation for arrow keys in a list or grid

## Parameters

### event

`KeyboardEvent`

Keyboard event

### currentIndex

`number`

Current focused item index

### totalItems

`number`

Total number of items

### onIndexChange

(`newIndex`) => `void`

Callback when index changes

### orientation?

`"horizontal"` \| `"vertical"`

List orientation (horizontal or vertical)

## Returns

`void`
