[**CIA Compliance Manager — Markdown Documentation v1.1.70**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorProvider

# Variable: ErrorProvider

> `const` **ErrorProvider**: `React.FC`\<[`ErrorProviderProps`](../interfaces/ErrorProviderProps.md)\>

Defined in: [contexts/ErrorContext.tsx:133](https://github.com/Hack23/cia-compliance-manager/blob/761505116bf51c4d4f34df509345cff1443ea33a/src/contexts/ErrorContext.tsx#L133)

Error Provider Component

Provides error context to child components, managing error state and
toast notifications.

## Example

```tsx
// Wrap application with ErrorProvider
<ErrorProvider>
  <App />
</ErrorProvider>

// Use in components
const { addError, showToast } = useError();

try {
  await fetchData();
} catch (error) {
  addError(error, { component: 'DataFetcher' });
  showToast({
    message: 'Failed to load data',
    retry: () => fetchData()
  });
}
```
