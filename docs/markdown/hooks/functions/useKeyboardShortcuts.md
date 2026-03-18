[**CIA Compliance Manager Documentation v1.1.32**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [hooks](../README.md) / useKeyboardShortcuts

# Function: useKeyboardShortcuts()

> **useKeyboardShortcuts**(`options`): `void`

Defined in: [hooks/useKeyboardShortcuts.ts:42](https://github.com/Hack23/cia-compliance-manager/blob/5d9bfa9bf972c007ee203f3866fd9fbbb105b179/src/hooks/useKeyboardShortcuts.ts#L42)

Custom hook for registering and handling keyboard shortcuts

## Parameters

### options

[`UseKeyboardShortcutsOptions`](../../types/interfaces/UseKeyboardShortcutsOptions.md)

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
