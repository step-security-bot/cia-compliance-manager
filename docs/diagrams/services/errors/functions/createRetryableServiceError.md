[**CIA Compliance Manager — UML Diagrams v1.1.46**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createRetryableServiceError

# Function: createRetryableServiceError()

> **createRetryableServiceError**(`message`, `retryAfter?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:316](https://github.com/Hack23/cia-compliance-manager/blob/3c2111b159a69ffb9dbeb7d56f278f1f19203de4/src/services/errors.ts#L316)

Create a retryable error using ServiceError

## Parameters

### message

`string`

Error message

### retryAfter?

`number`

Optional retry delay in seconds

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
