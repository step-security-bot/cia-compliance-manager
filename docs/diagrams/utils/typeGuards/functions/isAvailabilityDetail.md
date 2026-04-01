[**CIA Compliance Manager — UML Diagrams v1.1.43**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/typeGuards](../README.md) / isAvailabilityDetail

# Function: isAvailabilityDetail()

> **isAvailabilityDetail**(`obj`): `obj is AvailabilityDetail`

Defined in: [utils/typeGuards.ts:57](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/utils/typeGuards.ts#L57)

Type guard to check if an object is an AvailabilityDetail

## Parameters

### obj

`unknown`

Value to check

## Returns

`obj is AvailabilityDetail`

True if obj is an AvailabilityDetail

## Example

```typescript
const data: unknown = getAvailabilityData();
if (isAvailabilityDetail(data)) {
  console.log(data.uptime); // Safe to access uptime property
  console.log(data.recommendations); // Safe to access array
}
```
