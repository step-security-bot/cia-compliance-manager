[**CIA Compliance Manager — UML Diagrams v1.1.104**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / toErrorObject

# Variable: toErrorObject

> **toErrorObject**: (`err`) => `Error`

Defined in: [utils/index.ts:208](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/utils/index.ts#L208)

Converts any error value to an Error object

Handles various error types including Error objects, objects with message
properties, strings, and other primitives. Essential for consistent error
handling across the application.

## Parameters

### err

`unknown`

The error value to convert (can be any type)

## Returns

`Error`

An Error object with appropriate message

## Example

```typescript
// Convert Error object (passthrough)
toErrorObject(new Error('Failed'))  // Error: Failed

// Convert string
toErrorObject('Network timeout')    // Error: Network timeout

// Convert object with message
toErrorObject({ message: 'Invalid data' })  // Error: Invalid data

// Convert number
toErrorObject(404)                  // Error: 404

// Usage in catch blocks
try {
  await riskyOperation();
} catch (err) {
  const error = toErrorObject(err);
  logger.error(error.message);
}
```
