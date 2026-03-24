[**CIA Compliance Manager — Markdown Documentation v1.1.38**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/ComplianceServiceAdapter](../README.md) / getFrameworkCoverage

# Function: getFrameworkCoverage()

> **getFrameworkCoverage**(`levels`): [`FrameworkCoverage`](../interfaces/FrameworkCoverage.md)[]

Defined in: [services/ComplianceServiceAdapter.ts:463](https://github.com/Hack23/cia-compliance-manager/blob/e53f32b24281901e3964b603dea2bfa4c23bab48/src/services/ComplianceServiceAdapter.ts#L463)

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
