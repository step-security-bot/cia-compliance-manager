[**CIA Compliance Manager — UML Diagrams v1.1.59**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / handleWidgetError

# Variable: handleWidgetError

> **handleWidgetError**: (`error`) => `string`

Defined in: [utils/index.ts:150](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/utils/index.ts#L150)

Handle widget errors and format error messages consistently

Provides consistent error message formatting across all widgets,
handling null/undefined errors gracefully with fallback messages.

## Parameters

### error

`Error` \| `null` \| `undefined`

Error object or null/undefined

## Returns

`string`

Formatted error message string

## Example

```typescript
handleWidgetError(new Error('Network failed'))  // 'Error: Network failed'
handleWidgetError(null)                         // 'Error: Unknown error'
handleWidgetError(undefined)                    // 'Error: Unknown error'

// Usage in error boundary
try {
  await loadWidgetData();
} catch (error) {
  const message = handleWidgetError(error as Error);
  showNotification(message);
}
```
