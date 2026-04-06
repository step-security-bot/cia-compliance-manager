[**CIA Compliance Manager — UML Diagrams v1.1.46**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / createNetworkServiceError

# Function: createNetworkServiceError()

> **createNetworkServiceError**(`message`, `statusCode?`, `context?`): [`ServiceError`](../classes/ServiceError.md)

Defined in: [services/errors.ts:296](https://github.com/Hack23/cia-compliance-manager/blob/3c2111b159a69ffb9dbeb7d56f278f1f19203de4/src/services/errors.ts#L296)

Create a network error using ServiceError

## Parameters

### message

`string`

Error message

### statusCode?

`number`

Optional HTTP status code

### context?

[`ErrorContext`](../interfaces/ErrorContext.md) = `{}`

Additional error context

## Returns

[`ServiceError`](../classes/ServiceError.md)

ServiceError instance
