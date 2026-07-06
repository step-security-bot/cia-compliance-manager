[**CIA Compliance Manager — UML Diagrams v1.1.102**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useKeyboardShortcuts](../README.md) / useKeyboardShortcuts

# Function: useKeyboardShortcuts()

> **useKeyboardShortcuts**(`options`): `void`

Defined in: [hooks/useKeyboardShortcuts.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/bfb8c9fef6315cdabac68419a9744b7771c7d28c/src/hooks/useKeyboardShortcuts.ts#L42)

Custom hook for registering and handling keyboard shortcuts

## Parameters

### options

[`UseKeyboardShortcutsOptions`](../../../types/keyboard/interfaces/UseKeyboardShortcutsOptions.md)

Configuration options for keyboard shortcuts

## Returns

`void`

## Example

```tsx
const shortcuts = {
  'save': {
    id: 'save',
    keys: 'ctrl+s',
    description: 'Save document',
    category: 'Actions',
    handler: () => handleSave(),
  }
};

useKeyboardShortcuts({
  shortcuts,
  enabled: true,
  preventDefault: true,
});
```
