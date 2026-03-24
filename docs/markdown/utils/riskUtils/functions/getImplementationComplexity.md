[**CIA Compliance Manager — Markdown Documentation v1.1.38**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/riskUtils](../README.md) / getImplementationComplexity

# Function: getImplementationComplexity()

> **getImplementationComplexity**(`availabilityLevel`, `integrityLevel`, `confidentialityLevel`): `string`

Defined in: [utils/riskUtils.ts:424](https://github.com/Hack23/cia-compliance-manager/blob/e53f32b24281901e3964b603dea2bfa4c23bab48/src/utils/riskUtils.ts#L424)

Determines the implementation complexity based on security levels

## Parameters

### availabilityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The availability security level

### integrityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The integrity security level

### confidentialityLevel

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

The confidentiality security level

## Returns

`string`

The implementation complexity as a string
