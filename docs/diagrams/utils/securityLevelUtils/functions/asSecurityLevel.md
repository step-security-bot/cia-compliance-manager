[**CIA Compliance Manager — UML Diagrams v1.1.72**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / asSecurityLevel

# Function: asSecurityLevel()

> **asSecurityLevel**(`value`, `fallback?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/b1e3e6a4b46e82b2bf6550c217205c9e138cce5a/src/utils/securityLevelUtils.ts#L540)

Convert string to security level, with fallback

## Parameters

### value

`string`

Value to convert

### fallback?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md) = `"None"`

Fallback level if invalid

## Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Valid security level
