[**CIA Compliance Manager — UML Diagrams v1.1.66**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / calculateRiskScore

# Function: calculateRiskScore()

> **calculateRiskScore**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `number`

Defined in: [utils/riskUtils.ts:181](https://github.com/Hack23/cia-compliance-manager/blob/97cb56d15411f9f3fd82222df7eda6b2d578a697/src/utils/riskUtils.ts#L181)

Calculate risk score from security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`number`

Risk score (0-100)
