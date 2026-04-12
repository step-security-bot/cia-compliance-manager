[**CIA Compliance Manager — UML Diagrams v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/complianceService](../README.md) / getComplianceStatus

# Function: getComplianceStatus()

> **getComplianceStatus**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `Promise`\<[`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)\>

Defined in: [services/complianceService.ts:1059](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/services/complianceService.ts#L1059)

Get compliance status based on security levels

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

`Promise`\<[`ComplianceStatusDetails`](../../../types/compliance/interfaces/ComplianceStatusDetails.md)\>

Compliance status details
