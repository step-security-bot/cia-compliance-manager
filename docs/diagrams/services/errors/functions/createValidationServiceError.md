[**CIA Compliance Manager — UML Diagrams v1.1.38**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createValidationServiceError

# Function: createValidationServiceError()

> **createValidationServiceError**(`message`, `field?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/e53f32b24281901e3964b603dea2bfa4c23bab48/src/services/errors.ts#L276)

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
