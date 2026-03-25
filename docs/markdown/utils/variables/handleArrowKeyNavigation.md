[**CIA Compliance Manager — Markdown Documentation v1.1.39**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / handleArrowKeyNavigation

# Variable: handleArrowKeyNavigation

> **handleArrowKeyNavigation**: (`event`, `currentIndex`, `totalItems`, `onIndexChange`, `orientation`) => `void`

Defined in: [utils/index.ts:47](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/utils/index.ts#L47)

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
