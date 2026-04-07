[**CIA Compliance Manager — Markdown Documentation v1.1.47**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / getRiskLevelFromSecurityLevel

# Variable: getRiskLevelFromSecurityLevel

> **getRiskLevelFromSecurityLevel**: (`level`) => `string`

Defined in: [utils/index.ts:121](https://github.com/Hack23/cia-compliance-manager/blob/0a914ff8809ea300c13e0a51b2ef582dc0e7a4a4/src/utils/index.ts#L121)

Get risk level string from security level

Maps security levels to corresponding risk levels using inverse relationship:
higher security = lower risk. Essential for risk assessment and reporting.

## Parameters

### level

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Security level

## Returns

`string`

Risk level string describing the security posture

## Example

```typescript
getRiskLevelFromSecurityLevel('None')       // "Critical Risk"
getRiskLevelFromSecurityLevel('Low')        // "High Risk"
getRiskLevelFromSecurityLevel('Moderate')   // "Medium Risk"
getRiskLevelFromSecurityLevel('High')       // "Low Risk"
getRiskLevelFromSecurityLevel('Very High')  // "Minimal Risk"

// Usage in risk assessment
const securityLevel = getSecurityLevel();
const riskLevel = getRiskLevelFromSecurityLevel(securityLevel);
console.log(`Current risk: ${riskLevel}`);
```
