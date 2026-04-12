[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [utils](../README.md) / compareSecurityLevels

# Variable: compareSecurityLevels

> **compareSecurityLevels**: (`levelA`, `levelB`) => `number`

Defined in: [utils/index.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/utils/index.ts#L108)

Compare two security levels

## Parameters

### levelA

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

First security level

### levelB

[`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)

Second security level

## Returns

`number`

-1 if A < B, 0 if A = B, 1 if A > B
