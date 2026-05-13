[**CIA Compliance Manager — Markdown Documentation v1.1.72**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContext

# Function: useKeyboardShortcutContext()

> **useKeyboardShortcutContext**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md)

Defined in: [contexts/KeyboardShortcutContext.tsx:141](https://github.com/Hack23/cia-compliance-manager/blob/b1e3e6a4b46e82b2bf6550c217205c9e138cce5a/src/contexts/KeyboardShortcutContext.tsx#L141)

Hook to access keyboard shortcut context

## Returns

[`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md)

Keyboard shortcut context value

## Throws

Error if used outside of KeyboardShortcutProvider

## Example

```tsx
const { shortcuts, registerShortcut, showHelp, setShowHelp } = useKeyboardShortcutContext();
```
