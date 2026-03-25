[**CIA Compliance Manager — UML Diagrams v1.1.39**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / isObject

# Variable: isObject

> **isObject**: (`value`) => value is Record\<string \| number \| symbol, unknown\>

Defined in: [utils/index.ts:210](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/utils/index.ts#L210)

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
