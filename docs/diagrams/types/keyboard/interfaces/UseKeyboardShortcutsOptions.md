[**CIA Compliance Manager — UML Diagrams v1.1.88**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/keyboard](../README.md) / UseKeyboardShortcutsOptions

# Interface: UseKeyboardShortcutsOptions

Defined in: [types/keyboard.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L61)

Props for keyboard shortcut hook

## Properties

### shortcuts

> **shortcuts**: [`ShortcutMap`](../type-aliases/ShortcutMap.md)

Defined in: [types/keyboard.ts:63](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L63)

Map of shortcuts to register

***

### enabled?

> `optional` **enabled?**: `boolean`

Defined in: [types/keyboard.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L66)

Whether shortcuts are enabled

***

### preventDefault?

> `optional` **preventDefault?**: `boolean`

Defined in: [types/keyboard.ts:69](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L69)

Prevent default browser behavior

***

### stopPropagation?

> `optional` **stopPropagation?**: `boolean`

Defined in: [types/keyboard.ts:72](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/types/keyboard.ts#L72)

Stop event propagation
