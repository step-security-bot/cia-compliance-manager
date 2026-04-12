[**CIA Compliance Manager — UML Diagrams v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/ComplianceServiceAdapter](../README.md) / getFrameworkCoverage

# Function: getFrameworkCoverage()

> **getFrameworkCoverage**(`levels`): [`FrameworkCoverage`](../interfaces/FrameworkCoverage.md)[]

Defined in: [services/ComplianceServiceAdapter.ts:463](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/services/ComplianceServiceAdapter.ts#L463)

Get framework coverage analysis based on security levels

## Parameters

### levels

Object containing security levels for availability, integrity, and confidentiality

#### availability

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### integrity

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### confidentiality

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

## Returns

[`FrameworkCoverage`](../interfaces/FrameworkCoverage.md)[]

Array of framework coverage information
