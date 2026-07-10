[**CIA Compliance Manager — UML Diagrams v1.1.106**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/services](../README.md) / IServiceFactory

# Interface: IServiceFactory\<T\>

Defined in: [types/services.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/122721fe21088cc17896bc69556bad86b47a1c48/src/types/services.ts#L420)

Service factory interface

Defines a standard way to create service instances

## Type Parameters

### T

`T` *extends* [`IBaseService`](IBaseService.md)

## Methods

### create()

> **create**(`config?`): `T`

Defined in: [types/services.ts:427](https://github.com/Hack23/cia-compliance-manager/blob/122721fe21088cc17896bc69556bad86b47a1c48/src/types/services.ts#L427)

Create a new service instance

#### Parameters

##### config?

[`ServiceConfig`](ServiceConfig.md)

Optional configuration

#### Returns

`T`

Service instance
