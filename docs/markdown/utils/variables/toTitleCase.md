[**CIA Compliance Manager — Markdown Documentation v1.1.97**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / toTitleCase

# Variable: toTitleCase

> **toTitleCase**: (`str`) => `string`

Defined in: [utils/index.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/utils/index.ts#L90)

Converts a string to title case

Transforms strings by capitalizing the first letter of each word and
lowercasing the rest. Useful for formatting security level names,
component labels, and user-facing text.

## Parameters

### str

`string`

The string to convert to title case

## Returns

`string`

The title-cased string

## Example

```typescript
toTitleCase('hello world')           // 'Hello World'
toTitleCase('SECURITY LEVEL')        // 'Security Level'
toTitleCase('confidentiality')       // 'Confidentiality'
toTitleCase('risk-based approach')   // 'Risk-Based Approach'
toTitleCase('multi-factor authentication') // 'Multi-Factor Authentication'

// Usage in display
const displayName = toTitleCase(component);
<h2>{displayName} Analysis</h2>
```
