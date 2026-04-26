[**CIA Compliance Manager — UML Diagrams v1.1.59**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/riskUtils](../README.md) / getHighestImpactArea

# Function: getHighestImpactArea()

> **getHighestImpactArea**(`availabilityImpact`, `integrityImpact`, `confidentialityImpact`): `string`

Defined in: [utils/riskUtils.ts:448](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/utils/riskUtils.ts#L448)

Identifies the highest impact area from component impact details

## Parameters

### availabilityImpact

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Availability impact details

### integrityImpact

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Integrity impact details

### confidentialityImpact

[`BusinessImpactDetails`](../../../types/cia-services/interfaces/BusinessImpactDetails.md)

Confidentiality impact details

## Returns

`string`

The highest impact area or areas as a string
