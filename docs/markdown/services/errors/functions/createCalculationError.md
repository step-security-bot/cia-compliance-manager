[**CIA Compliance Manager — Markdown Documentation v1.1.45**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / createCalculationError

# Function: createCalculationError()

> **createCalculationError**(`message`, `context?`, `cause?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:223](https://github.com/Hack23/cia-compliance-manager/blob/568723154325dac17085672acf7cf8f6076f6c87/src/services/errors.ts#L223)

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
