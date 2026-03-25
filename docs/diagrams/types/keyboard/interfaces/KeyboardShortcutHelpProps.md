[**CIA Compliance Manager — UML Diagrams v1.1.39**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/keyboard](../README.md) / KeyboardShortcutHelpProps

# Interface: KeyboardShortcutHelpProps

Defined in: [types/keyboard.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/types/keyboard.ts#L107)

Props for keyboard shortcut help modal

## Properties

### isOpen

> **isOpen**: `boolean`

Defined in: [types/keyboard.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/types/keyboard.ts#L109)

Whether the modal is open

***

### onClose

> **onClose**: () => `void`

Defined in: [types/keyboard.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/types/keyboard.ts#L112)

Callback when modal is closed

#### Returns

`void`

***

### shortcuts?

> `optional` **shortcuts?**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/types/keyboard.ts#L115)

Shortcuts to display (defaults to all)
