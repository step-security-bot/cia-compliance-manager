[**CIA Compliance Manager — UML Diagrams v1.1.81**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/securityLevelUtils](../README.md) / asSecurityLevel

# Function: asSecurityLevel()

> **asSecurityLevel**(`value`, `fallback?`): [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/securityLevelUtils.ts:540](https://github.com/Hack23/cia-compliance-manager/blob/8fa41915ca9153d5689c4d663292dcfd3d6de4ad/src/utils/securityLevelUtils.ts#L540)

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
