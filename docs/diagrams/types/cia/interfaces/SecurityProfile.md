[**CIA Compliance Manager — UML Diagrams v1.1.63**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia](../README.md) / SecurityProfile

# Interface: SecurityProfile

Defined in: [types/cia.ts:324](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia.ts#L324)

Security profile containing all security levels

Represents a complete security configuration for a system,
including individual CIA component levels and an overall security level.

## Example

```typescript
const profile: SecurityProfile = {
  availabilityLevel: 'High',
  integrityLevel: 'Very High',
  confidentialityLevel: 'High',
  securityLevel: 'Very High' // Calculated from highest component level
};
```

## Properties

### availabilityLevel

> **availabilityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:326](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia.ts#L326)

Security level for system availability

***

### integrityLevel

> **integrityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:329](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia.ts#L329)

Security level for data integrity

***

### confidentialityLevel

> **confidentialityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:332](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia.ts#L332)

Security level for data confidentiality

***

### securityLevel

> **securityLevel**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:335](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia.ts#L335)

Overall security level (typically the highest of the three components)
