[**CIA Compliance Manager — UML Diagrams v1.1.54**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / asSecurityLevel

# Variable: asSecurityLevel

> **asSecurityLevel**: (`value`, `fallback`) => [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [utils/index.ts:131](https://github.com/Hack23/cia-compliance-manager/blob/ec53446d20ff3941e43c6f67d15ff98cb084ddbd/src/utils/index.ts#L131)

Convert string to security level, with fallback

## Parameters

### value

`string`

Value to convert

### fallback?

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md) = `"None"`

Fallback level if invalid

## Returns

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Valid security level
