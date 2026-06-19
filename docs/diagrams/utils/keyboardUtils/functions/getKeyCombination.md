[**CIA Compliance Manager — UML Diagrams v1.1.93**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/keyboardUtils](../README.md) / getKeyCombination

# Function: getKeyCombination()

> **getKeyCombination**(`event`): `string`

Defined in: [utils/keyboardUtils.ts:188](https://github.com/Hack23/cia-compliance-manager/blob/06d50a5058053bb206ed360d6872714a86cfd3b0/src/utils/keyboardUtils.ts#L188)

Get key combination string from keyboard event

Converts KeyboardEvent to a normalized key combination string.
Handles platform differences (Cmd vs. Ctrl) and special keys.

## Parameters

### event

`KeyboardEvent`

The keyboard event

## Returns

`string`

Key combination string (e.g., 'ctrl+shift+k')

## Example

```typescript
// In event handler
document.addEventListener('keydown', (event) => {
  const combo = getKeyCombination(event);
  
  // Match against shortcuts
  if (combo === 'ctrl+shift+k' || combo === 'cmd+shift+k') {
    event.preventDefault();
    openCommandPalette();
  }
  
  // Log for debugging
  console.log('Key combo:', combo);
  // Examples: 'ctrl+s', 'cmd+k', 'shift+enter', 'escape'
});

// Handle special keys
// Space key: 'ctrl+space'
// Escape key: 'escape'
// Enter key: 'shift+enter'
```
