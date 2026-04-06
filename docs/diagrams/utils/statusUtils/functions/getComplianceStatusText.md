[**CIA Compliance Manager — UML Diagrams v1.1.46**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/statusUtils](../README.md) / getComplianceStatusText

# Function: getComplianceStatusText()

> **getComplianceStatusText**(`complianceScore`): `string`

Defined in: [utils/statusUtils.ts:114](https://github.com/Hack23/cia-compliance-manager/blob/3c2111b159a69ffb9dbeb7d56f278f1f19203de4/src/utils/statusUtils.ts#L114)

Gets compliance status text based on compliance score

Translates numeric compliance scores into human-readable status messages
for executives and stakeholders. Uses industry-standard thresholds for
compliance categorization.

## Parameters

### complianceScore

`number`

The compliance score percentage (0-100)

## Returns

`string`

Human-readable compliance status text

## Example

```typescript
getComplianceStatusText(95)  // 'Strong compliance position'
getComplianceStatusText(80)  // 'Strong compliance position'
getComplianceStatusText(65)  // 'Moderate compliance position'
getComplianceStatusText(50)  // 'Moderate compliance position'
getComplianceStatusText(30)  // 'Compliance gaps detected'
getComplianceStatusText(0)   // 'Compliance gaps detected'

// Usage in dashboard
const score = calculateComplianceScore();
const status = getComplianceStatusText(score);
<ComplianceCard score={score} status={status} />
```
