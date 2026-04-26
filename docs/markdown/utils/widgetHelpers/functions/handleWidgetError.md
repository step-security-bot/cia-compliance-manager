[**CIA Compliance Manager — Markdown Documentation v1.1.58**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/widgetHelpers](../README.md) / handleWidgetError

# Function: handleWidgetError()

> **handleWidgetError**(`error`): `string`

Defined in: [utils/widgetHelpers.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/84222a9962d7a7a5e28ce024c77c70b4ccc10b90/src/utils/widgetHelpers.ts#L108)

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
