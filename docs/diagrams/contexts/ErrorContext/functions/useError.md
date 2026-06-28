[**CIA Compliance Manager — UML Diagrams v1.1.98**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [contexts/ErrorContext](../README.md) / useError

# Function: useError()

> **useError**(): [`ErrorContextValue`](../interfaces/ErrorContextValue.md)

Defined in: [contexts/ErrorContext.tsx:262](https://github.com/Hack23/cia-compliance-manager/blob/2f201a728b15b42b9d8c9bebf9ed16f5d9c05e5e/src/contexts/ErrorContext.tsx#L262)

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
