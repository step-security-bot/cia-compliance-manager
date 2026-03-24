[**CIA Compliance Manager — Markdown Documentation v1.1.37**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / createRetryableServiceError

# Function: createRetryableServiceError()

> **createRetryableServiceError**(`message`, `retryAfter?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:316](https://github.com/Hack23/cia-compliance-manager/blob/4c8200b5bddf128916a299baf22a27cf745941c8/src/services/errors.ts#L316)

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
