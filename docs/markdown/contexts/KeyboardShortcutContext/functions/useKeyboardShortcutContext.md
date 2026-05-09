[**CIA Compliance Manager — Markdown Documentation v1.1.69**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/KeyboardShortcutContext](../README.md) / useKeyboardShortcutContext

# Function: useKeyboardShortcutContext()

> **useKeyboardShortcutContext**(): [`KeyboardShortcutContextValue`](../../../types/keyboard/interfaces/KeyboardShortcutContextValue.md)

Defined in: [contexts/KeyboardShortcutContext.tsx:144](https://github.com/Hack23/cia-compliance-manager/blob/b616fbaa2bb30d924b7315cd583f8328bb70f347/src/contexts/KeyboardShortcutContext.tsx#L144)

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
