[**CIA Compliance Manager — UML Diagrams v1.1.57**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/securityMetricsService](../README.md) / TechnicalDetailsResponse

# Interface: TechnicalDetailsResponse

Defined in: [services/securityMetricsService.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/b65886b2c937dced390a9cf3f2ef04f8227e15f8/src/services/securityMetricsService.ts#L45)

Technical details response for security implementation

## Properties

### architecture

> **architecture**: `object`

Defined in: [services/securityMetricsService.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/b65886b2c937dced390a9cf3f2ef04f8227e15f8/src/services/securityMetricsService.ts#L46)

Architecture details including components and optional diagrams

#### description

> **description**: `string`

#### components

> **components**: `object`[]

#### diagrams?

> `optional` **diagrams?**: `unknown`[]

***

### implementation

> **implementation**: `object`

Defined in: [services/securityMetricsService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/b65886b2c937dced390a9cf3f2ef04f8227e15f8/src/services/securityMetricsService.ts#L55)

Implementation plan details

#### steps?

> `optional` **steps?**: `string`[]

#### timeline

> **timeline**: `string`

#### keyMilestones

> **keyMilestones**: `string`[]

#### resources

> **resources**: `object`[]

#### complexity?

> `optional` **complexity?**: `string`

***

### technologies?

> `optional` **technologies?**: `Record`\<`string`, `unknown`\>

Defined in: [services/securityMetricsService.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/b65886b2c937dced390a9cf3f2ef04f8227e15f8/src/services/securityMetricsService.ts#L65)

Technology stack by component (availability, integrity, confidentiality)
