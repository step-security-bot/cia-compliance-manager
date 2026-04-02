[**CIA Compliance Manager — Markdown Documentation v1.1.44**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / CIAComponent

# Type Alias: CIAComponent

> **CIAComponent** = `"confidentiality"` \| `"integrity"` \| `"availability"`

Defined in: [types/cia.ts:226](https://github.com/Hack23/cia-compliance-manager/blob/e5798eb2d906d521a46ab269f5cbb9b8afb6f74b/src/types/cia.ts#L226)

CIA triad components representing different security aspects

- **confidentiality**: Data privacy and access control (who can see the data)
- **integrity**: Data accuracy and consistency (ensuring data is not tampered with)
- **availability**: System uptime and accessibility (ensuring the system is accessible when needed)

## Example

```typescript
const component: CIAComponent = 'availability';
// Use to configure security level for availability
```
