[**CIA Compliance Manager — Markdown Documentation v1.1.58**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / useError

# Function: useError()

> **useError**(): [`ErrorContextValue`](../interfaces/ErrorContextValue.md)

Defined in: [contexts/ErrorContext.tsx:266](https://github.com/Hack23/cia-compliance-manager/blob/84222a9962d7a7a5e28ce024c77c70b4ccc10b90/src/contexts/ErrorContext.tsx#L266)

Custom hook to use error context

## Returns

[`ErrorContextValue`](../interfaces/ErrorContextValue.md)

Error context value

## Throws

Error if used outside ErrorProvider

## Example

```tsx
const { addError, showToast, clearError } = useError();

// Track and display error
try {
  await saveData();
} catch (error) {
  addError(error, { operation: 'save' });
  showToast({
    message: 'Failed to save data',
    retry: () => saveData()
  });
}
```
