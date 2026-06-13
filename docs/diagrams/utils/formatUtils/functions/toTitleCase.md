[**CIA Compliance Manager — UML Diagrams v1.1.88**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / toTitleCase

# Function: toTitleCase()

> **toTitleCase**(`str`): `string`

Defined in: [utils/formatUtils.ts:39](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/utils/formatUtils.ts#L39)

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
