[**CIA Compliance Manager — Markdown Documentation v1.1.101**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/serviceUtils](../README.md) / createEmptyCIADetails

# Function: createEmptyCIADetails()

> **createEmptyCIADetails**(): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

Defined in: [utils/serviceUtils.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/6723306427ccc04dd3d118787ac833aded0c707b/src/utils/serviceUtils.ts#L25)

Creates an empty CIADetails object with default values for all required fields
This helps satisfy type requirements when creating mock/empty objects

## Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md)

An empty CIADetails object

## Example

```typescript
// Create empty placeholder
const empty = createEmptyCIADetails();

// Use as fallback in service
const details = data?.details ?? createEmptyCIADetails();

// Initialize with partial data
const details = {
  ...createEmptyCIADetails(),
  description: 'Custom description',
  capex: 50000
};
```
