[**CIA Compliance Manager — Markdown Documentation v1.1.48**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/StatusBadge](../README.md) / StatusBadgeProps

# Interface: StatusBadgeProps

Defined in: [components/common/StatusBadge.tsx:5](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L5)

## Properties

### status

> **status**: [`StatusType`](../../../../types/common/StatusTypes/type-aliases/StatusType.md)

Defined in: [components/common/StatusBadge.tsx:9](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L9)

The status type (determines color when variant is not provided)

***

### children

> **children**: `ReactNode`

Defined in: [components/common/StatusBadge.tsx:14](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L14)

The content to display inside the badge

***

### className?

> `optional` **className?**: `string`

Defined in: [components/common/StatusBadge.tsx:19](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L19)

Additional CSS classes

***

### testId?

> `optional` **testId?**: `string`

Defined in: [components/common/StatusBadge.tsx:24](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L24)

Test ID for automated testing

***

### size?

> `optional` **size?**: `"sm"` \| `"md"` \| `"lg"`

Defined in: [components/common/StatusBadge.tsx:29](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L29)

Optional size variant

***

### variant?

> `optional` **variant?**: `string`

Defined in: [components/common/StatusBadge.tsx:45](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/components/common/StatusBadge.tsx#L45)

Badge color scheme override. When provided and matches a known type,
overrides the color derived from `status`. This allows callers to
decouple the semantic status from the visual presentation.

#### Example

```tsx
// Color driven by status (default behavior)
<StatusBadge status="success">OK</StatusBadge>

// Color overridden by variant
<StatusBadge status="info" variant="warning">Needs attention</StatusBadge>
```
