[**CIA Compliance Manager — Markdown Documentation v1.1.57**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/services](../README.md) / IServiceFactory

# Interface: IServiceFactory\<T\>

Defined in: [types/services.ts:420](https://github.com/Hack23/cia-compliance-manager/blob/b65886b2c937dced390a9cf3f2ef04f8227e15f8/src/types/services.ts#L420)

Service factory interface

Defines a standard way to create service instances

## Type Parameters

### T

`T` *extends* [`IBaseService`](IBaseService.md)

## Methods

### create()

> **create**(`config?`): `T`

Defined in: [types/services.ts:427](https://github.com/Hack23/cia-compliance-manager/blob/b65886b2c937dced390a9cf3f2ef04f8227e15f8/src/types/services.ts#L427)

Create a new service instance

#### Parameters

##### config?

[`ServiceConfig`](ServiceConfig.md)

Optional configuration

#### Returns

`T`

Service instance
