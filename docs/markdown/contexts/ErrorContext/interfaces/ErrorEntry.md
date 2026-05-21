[**CIA Compliance Manager — Markdown Documentation v1.1.77**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [contexts/ErrorContext](../README.md) / ErrorEntry

# Interface: ErrorEntry

Defined in: [contexts/ErrorContext.tsx:27](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L27)

Error entry for tracking errors

## Properties

### id

> **id**: `string`

Defined in: [contexts/ErrorContext.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L29)

Unique error ID

***

### error

> **error**: `Error`

Defined in: [contexts/ErrorContext.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L31)

Error object

***

### message

> **message**: `string`

Defined in: [contexts/ErrorContext.tsx:33](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L33)

User-friendly error message

***

### timestamp

> **timestamp**: `Date`

Defined in: [contexts/ErrorContext.tsx:35](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L35)

Error timestamp

***

### recoverable

> **recoverable**: `boolean`

Defined in: [contexts/ErrorContext.tsx:37](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L37)

Whether the error is recoverable

***

### context?

> `optional` **context?**: `Record`\<`string`, `unknown`\>

Defined in: [contexts/ErrorContext.tsx:39](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/contexts/ErrorContext.tsx#L39)

Error context
