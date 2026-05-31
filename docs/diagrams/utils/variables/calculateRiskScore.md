[**CIA Compliance Manager — UML Diagrams v1.1.81**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / calculateRiskScore

# Variable: calculateRiskScore

> **calculateRiskScore**: (`availabilityLevel`, `integrityLevel`, `confidentialityLevel`) => `number`

Defined in: [utils/index.ts:104](https://github.com/Hack23/cia-compliance-manager/blob/8fa41915ca9153d5689c4d663292dcfd3d6de4ad/src/utils/index.ts#L104)

Calculate risk score from security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Availability security level

### integrityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Integrity security level

### confidentialityLevel

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Confidentiality security level

## Returns

`number`

Risk score (0-100)
