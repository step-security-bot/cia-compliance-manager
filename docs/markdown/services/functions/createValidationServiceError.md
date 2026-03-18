[**CIA Compliance Manager Documentation v1.1.32**](../../README.md)

***

[CIA Compliance Manager Documentation](../../modules.md) / [services](../README.md) / createValidationServiceError

# Function: createValidationServiceError()

> **createValidationServiceError**(`message`, `field?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/5d9bfa9bf972c007ee203f3866fd9fbbb105b179/src/services/errors.ts#L276)

Create a validation error using ServiceError

## Parameters

### message

`string`

Error message

### field?

`string`

Optional field name that failed validation

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
