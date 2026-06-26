[**CIA Compliance Manager — Markdown Documentation v1.1.97**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/typeGuards](../README.md) / isObject

# Function: isObject()

> **isObject**(`value`): value is Record\<string \| number \| symbol, unknown\>

Defined in: [utils/typeGuards.ts:136](https://github.com/Hack23/cia-compliance-manager/blob/1b85d34c82bd4d30675f1a8b2cd37f0e6398fc9d/src/utils/typeGuards.ts#L136)

Type guard to check if a value is a non-null object

Useful for safely checking if a value is an object before accessing properties.
Filters out null, arrays, and primitive values.

## Parameters

### value

`unknown`

Value to check

## Returns

value is Record\<string \| number \| symbol, unknown\>

True if value is a non-null object (excludes arrays)

## Example

```typescript
isObject({})              // true
isObject({ key: 'val' })  // true
isObject(null)            // false
isObject([])              // false (arrays excluded)
isObject('string')        // false
isObject(123)             // false

// Usage in code
const data: unknown = getUserData();
if (isObject(data) && 'name' in data) {
  console.log(data.name); // Safe property access
}
```
