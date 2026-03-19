[**CIA Compliance Manager — Markdown Documentation v1.1.33**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [hooks/useSecurityMetricsService](../README.md) / useSecurityMetricsService

# Function: useSecurityMetricsService()

> **useSecurityMetricsService**(): `object`

Defined in: [hooks/useSecurityMetricsService.ts:13](https://github.com/Hack23/cia-compliance-manager/blob/94f5ebbb955e20e7ecd8df8e067b2edac2a859ae/src/hooks/useSecurityMetricsService.ts#L13)

Hook for accessing the SecurityMetricsService

## Returns

`object`

An object containing the SecurityMetricsService instance, loading state, and error

### securityMetricsService

> **securityMetricsService**: [`SecurityMetricsService`](../../../services/securityMetricsService/classes/SecurityMetricsService.md) \| `null`

### error

> **error**: `Error` \| `null`

### isLoading

> **isLoading**: `boolean`

### refreshService

> **refreshService**: () => `Promise`\<`void`\> = `initService`

#### Returns

`Promise`\<`void`\>
