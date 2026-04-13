[**CIA Compliance Manager — UML Diagrams v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [data/riskImpactData](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [data/riskImpactData.ts:116](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/data/riskImpactData.ts#L116)

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
