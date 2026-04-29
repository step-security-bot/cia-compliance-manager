[**CIA Compliance Manager — UML Diagrams v1.1.61**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [hooks/useSecurityLevelState](../README.md) / UseSecurityLevelStateReturn

# Interface: UseSecurityLevelStateReturn

Defined in: [hooks/useSecurityLevelState.ts:23](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/hooks/useSecurityLevelState.ts#L23)

Return type for useSecurityLevelState hook

## Properties

### levels

> **levels**: [`SecurityLevelState`](SecurityLevelState.md)

Defined in: [hooks/useSecurityLevelState.ts:25](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/hooks/useSecurityLevelState.ts#L25)

Current security levels for all components

***

### setLevel

> **setLevel**: (`component`, `level`) => `void`

Defined in: [hooks/useSecurityLevelState.ts:28](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/hooks/useSecurityLevelState.ts#L28)

Updates security level for a specific component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### resetLevels

> **resetLevels**: (`defaultLevel?`) => `void`

Defined in: [hooks/useSecurityLevelState.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/hooks/useSecurityLevelState.ts#L31)

Resets all security levels to default

#### Parameters

##### defaultLevel?

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`void`

***

### getLevel

> **getLevel**: (`component`) => [`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

Defined in: [hooks/useSecurityLevelState.ts:34](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/hooks/useSecurityLevelState.ts#L34)

Gets security level for a specific component

#### Parameters

##### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

#### Returns

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)
