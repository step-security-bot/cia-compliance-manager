[**CIA Compliance Manager — Markdown Documentation v1.1.87**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context?`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:216](https://github.com/Hack23/cia-compliance-manager/blob/a11560a745c378c1fceeb4ba46fba618fee7de09/src/services/errors.ts#L216)

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
