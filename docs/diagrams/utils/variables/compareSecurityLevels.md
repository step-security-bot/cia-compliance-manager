[**CIA Compliance Manager — UML Diagrams v1.1.39**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / compareSecurityLevels

# Variable: compareSecurityLevels

> **compareSecurityLevels**: (`levelA`, `levelB`) => `number`

Defined in: [utils/index.ts:108](https://github.com/Hack23/cia-compliance-manager/blob/45de32fe0767d7c6a06cfc307e433d32b081c07a/src/utils/index.ts#L108)

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
