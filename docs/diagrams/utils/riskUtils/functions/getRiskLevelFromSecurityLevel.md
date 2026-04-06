[**CIA Compliance Manager — UML Diagrams v1.1.46**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getRiskLevelFromSecurityLevel

# Function: getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [utils/riskUtils.ts:70](https://github.com/Hack23/cia-compliance-manager/blob/3c2111b159a69ffb9dbeb7d56f278f1f19203de4/src/utils/riskUtils.ts#L70)

Get risk level string from security level

Maps security levels to corresponding risk levels using inverse relationship:
higher security = lower risk. Essential for risk assessment and reporting.

## Parameters

### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

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
