[**CIA Compliance Manager — UML Diagrams v1.1.100**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContextOptional

# Function: useKeyboardShortcutContextOptional()

> **useKeyboardShortcutContextOptional**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md) \| `undefined`

Defined in: [contexts/KeyboardShortcutContext.tsx:166](https://github.com/Hack23/cia-compliance-manager/blob/0ccaee54608d4cc98f2276cb75ad2836fff7d84f/src/contexts/KeyboardShortcutContext.tsx#L166)

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
