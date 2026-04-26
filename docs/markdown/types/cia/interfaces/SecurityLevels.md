[**CIA Compliance Manager — Markdown Documentation v1.1.59**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / SecurityLevels

# Interface: SecurityLevels

Defined in: [types/cia.ts:505](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L505)

Selected security levels for each CIA pillar

Represents the currently selected or recommended security levels
for a specific system or application.

## Example

```typescript
const selectedLevels: SecurityLevels = {
  availability: 'High',
  integrity: 'Very High',
  confidentiality: 'Moderate'
};
```

## Properties

### availability

> **availability**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:507](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L507)

Selected availability security level

***

### integrity

> **integrity**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:510](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L510)

Selected integrity security level

***

### confidentiality

> **confidentiality**: [`SecurityLevel`](../type-aliases/SecurityLevel.md)

Defined in: [types/cia.ts:513](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/types/cia.ts#L513)

Selected confidentiality security level
