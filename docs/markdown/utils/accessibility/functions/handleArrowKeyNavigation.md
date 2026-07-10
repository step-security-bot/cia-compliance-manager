[**CIA Compliance Manager — Markdown Documentation v1.1.106**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/accessibility](../README.md) / handleArrowKeyNavigation

# Function: handleArrowKeyNavigation()

> **handleArrowKeyNavigation**(`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation?`): `void`

Defined in: [utils/accessibility.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/122721fe21088cc17896bc69556bad86b47a1c48/src/utils/accessibility.ts#L448)

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
