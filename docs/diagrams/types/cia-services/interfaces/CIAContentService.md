[**CIA Compliance Manager — UML Diagrams v1.1.63**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/cia-services](../README.md) / CIAContentService

# Interface: CIAContentService

Defined in: [types/cia-services.ts:399](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia-services.ts#L399)

CIA Content Service interface
Defines methods for retrieving CIA-related content and technical details

## Properties

### getComponentDetails?

> `optional` **getComponentDetails?**: (`component`, `level`) => `unknown`

Defined in: [types/cia-services.ts:400](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia-services.ts#L400)

#### Parameters

##### component

`string`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`unknown`

***

### getTechnicalRequirements?

> `optional` **getTechnicalRequirements?**: (`component`, `level`) => `string`[]

Defined in: [types/cia-services.ts:401](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia-services.ts#L401)

#### Parameters

##### component

`string`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getRequiredExpertise?

> `optional` **getRequiredExpertise?**: (`component`, `level`) => `string`[]

Defined in: [types/cia-services.ts:402](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia-services.ts#L402)

#### Parameters

##### component

`string`

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`[]

***

### getInformationSensitivity?

> `optional` **getInformationSensitivity?**: (`level`) => `string`

Defined in: [types/cia-services.ts:403](https://github.com/Hack23/cia-compliance-manager/blob/6d954d2566bfb96b9e9ada8fdcaca90cbf2874a9/src/types/cia-services.ts#L403)

#### Parameters

##### level

[`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
