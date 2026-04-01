[**CIA Compliance Manager — Markdown Documentation v1.1.43**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/BaseService](../README.md) / CIAService

# Interface: CIAService

Defined in: [services/BaseService.ts:21](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/BaseService.ts#L21)

Common interface for CIA services

## Methods

### getComponentDetails()

> **getComponentDetails**(`component`, `level`): [`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

Defined in: [services/BaseService.ts:22](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/BaseService.ts#L22)

#### Parameters

##### component

[`CIAComponentType`](../../../types/cia-services/type-aliases/CIAComponentType.md)

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

[`CIADetails`](../../../types/cia-services/interfaces/CIADetails.md) \| `undefined`

***

### getSecurityLevelDescription()

> **getSecurityLevelDescription**(`level`): `string`

Defined in: [services/BaseService.ts:26](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/BaseService.ts#L26)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`

***

### getRiskLevelFromSecurityLevel()

> **getRiskLevelFromSecurityLevel**(`level`): `string`

Defined in: [services/BaseService.ts:27](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/BaseService.ts#L27)

#### Parameters

##### level

[`SecurityLevel`](../../../types/cia/type-aliases/SecurityLevel.md)

#### Returns

`string`
