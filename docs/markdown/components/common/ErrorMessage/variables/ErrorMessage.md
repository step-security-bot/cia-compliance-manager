[**CIA Compliance Manager — Markdown Documentation v1.1.58**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/ErrorMessage](../README.md) / ErrorMessage

# Variable: ErrorMessage

> `const` **ErrorMessage**: `React.FC`\<[`ErrorMessageProps`](../interfaces/ErrorMessageProps.md)\>

Defined in: [components/common/ErrorMessage.tsx:67](https://github.com/Hack23/cia-compliance-manager/blob/84222a9962d7a7a5e28ce024c77c70b4ccc10b90/src/components/common/ErrorMessage.tsx#L67)

Error message component for displaying errors to users

## Business Perspective

Provides clear, actionable error messages to users when operations fail,
maintaining trust and helping users understand what went wrong and how
to proceed. Critical for operational excellence. ⚠️

## Technical Perspective

Reusable error display component with consistent styling and optional
retry functionality. Ensures errors are displayed in a user-friendly
manner across all widgets.

## Example

```tsx
// Simple error message
<ErrorMessage message="Failed to load data" />

// Error with custom title
<ErrorMessage 
  title="Connection Error" 
  message="Unable to reach the server"
/>

// Error with retry button
<ErrorMessage 
  message="Failed to load metrics"
  retry={() => refetchData()}
/>
```
