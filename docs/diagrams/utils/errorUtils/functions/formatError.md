[**CIA Compliance Manager — UML Diagrams v1.1.42**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/errorUtils](../README.md) / formatError

# Function: formatError()

> **formatError**(`err`, `prefix?`): `string`

Defined in: [utils/errorUtils.ts:109](https://github.com/Hack23/cia-compliance-manager/blob/ce3ecc4a3b34e88099c2e6d497b15097021e223f/src/utils/errorUtils.ts#L109)

Formats an error for consistent logging with optional prefix

Converts errors to formatted strings suitable for logging, with optional
contextual prefix for better error traceability. Handles unknown error types
safely.

## Parameters

### err

`unknown`

The error to format (can be any type)

### prefix?

`string`

Optional prefix for context (e.g., 'API', 'Database', 'Widget')

## Returns

`string`

A formatted error message string

## Example

```typescript
// Without prefix
formatError(new Error('Connection failed'))
// 'Connection failed'

// With prefix for context
formatError(new Error('Timeout'), 'API Call')
// 'API Call: Timeout'

formatError('Invalid input', 'Validation')
// 'Validation: Invalid input'

// Usage in service methods
try {
  await fetchData();
} catch (err) {
  const message = formatError(err, 'DataService');
  console.error(message);  // 'DataService: Network error'
}
```
