[**CIA Compliance Manager — UML Diagrams v1.1.104**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useComplianceService](../README.md) / useComplianceService

# Function: useComplianceService()

> **useComplianceService**(): `object`

Defined in: [hooks/useComplianceService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/hooks/useComplianceService.ts#L26)

Hook to access compliance service functionality

## Business Perspective

Provides compliance status and framework validation capabilities for CIA security levels.
Enables widgets to determine which compliance frameworks are satisfied based on
selected security configurations. 📋

## Returns

`object`

Object containing complianceService, isLoading state, and error state

### isLoading

> **isLoading**: `boolean`

### complianceService

> **complianceService**: [`ComplianceServiceAdapter`](../../../services/ComplianceServiceAdapter/classes/ComplianceServiceAdapter.md)

### error

> **error**: `Error` \| `null`

## Example

```typescript
const { complianceService, isLoading, error } = useComplianceService();

if (!isLoading && complianceService) {
  const status = complianceService.getComplianceStatus('High', 'High', 'High');
  console.log(status?.compliantFrameworks);
}
```
