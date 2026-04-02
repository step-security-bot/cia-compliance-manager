[**CIA Compliance Manager — UML Diagrams v1.1.44**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context?`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/e5798eb2d906d521a46ab269f5cbb9b8afb6f74b/src/services/errors.ts#L223)

Create a calculation error

## Parameters

### message

`string`

Error message

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Error context

### cause?

`Error`

Original error

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
