[**CIA Compliance Manager — UML Diagrams v1.1.45**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContextOptional

# Function: useKeyboardShortcutContextOptional()

> **useKeyboardShortcutContextOptional**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Defined in: [contexts/KeyboardShortcutContext.tsx:169](https://github.com/Hack23/cia-compliance-manager/blob/568723154325dac17085672acf7cf8f6076f6c87/src/contexts/KeyboardShortcutContext.tsx#L169)

Optional hook to access keyboard shortcut context (returns undefined if not in provider)

## Returns

[`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Keyboard shortcut context value or undefined

## Example

```tsx
const context = useKeyboardShortcutContextOptional();
if (context) {
  // Use context
}
```
