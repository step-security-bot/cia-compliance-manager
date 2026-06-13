[**CIA Compliance Manager — Markdown Documentation v1.1.88**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/keyboard](../README.md) / KeyboardShortcutHelpProps

# Interface: KeyboardShortcutHelpProps

Defined in: [types/keyboard.ts:107](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L107)

Props for keyboard shortcut help modal

## Properties

### isOpen

> **isOpen**: `boolean`

Defined in: [types/keyboard.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L109)

Whether the modal is open

***

### onClose

> **onClose**: () => `void`

Defined in: [types/keyboard.ts:112](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L112)

Callback when modal is closed

#### Returns

`void`

***

### shortcuts?

> `optional` **shortcuts?**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:115](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L115)

Shortcuts to display (defaults to all)
