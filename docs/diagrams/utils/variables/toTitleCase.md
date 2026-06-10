[**CIA Compliance Manager — UML Diagrams v1.1.86**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / toTitleCase

# Variable: toTitleCase

> **toTitleCase**: (`str`) => `string`

Defined in: [utils/index.ts:90](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/utils/index.ts#L90)

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
