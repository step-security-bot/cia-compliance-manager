[**CIA Compliance Manager — UML Diagrams v1.1.77**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/ErrorToast](../README.md) / ErrorToast

# Variable: ErrorToast

> `const` **ErrorToast**: `React.FC`\<[`ErrorToastProps`](../interfaces/ErrorToastProps.md)\>

Defined in: [components/common/ErrorToast.tsx:137](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/components/common/ErrorToast.tsx#L137)

Error Toast Component

Displays transient error notifications with auto-dismiss and optional retry.
Designed for errors that don't require blocking the entire UI.

## Example

```tsx
// Basic error toast
<ErrorToast
  message="Failed to save changes"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
/>

// Error toast with title and retry
<ErrorToast
  title="Network Error"
  message="Unable to connect to server"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
  retry={() => retryOperation()}
/>

// Custom position and timeout
<ErrorToast
  message="Operation failed"
  isVisible={showToast}
  onDismiss={() => setShowToast(false)}
  position="bottom-center"
  autoHideDuration={10000}
/>
```
