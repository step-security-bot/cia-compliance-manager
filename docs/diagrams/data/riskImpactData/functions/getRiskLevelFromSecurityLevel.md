[**CIA Compliance Manager — UML Diagrams v1.1.54**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [data/riskImpactData.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/ec53446d20ff3941e43c6f67d15ff98cb084ddbd/src/data/riskImpactData.ts#L116)

Get risk level from security level

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Security level to convert

## Returns

`string`

Risk level string corresponding to the security level

## Example

```typescript
getRiskLevelFromSecurityLevel("None") // Returns "Critical"
getRiskLevelFromSecurityLevel("Very High") // Returns "Minimal"
```
