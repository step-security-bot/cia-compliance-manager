[**CIA Compliance Manager — Markdown Documentation v1.1.104**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/securityMetricsService](../README.md) / TechnicalDetailsResponse

# Interface: TechnicalDetailsResponse

Defined in: [services/securityMetricsService.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/services/securityMetricsService.ts#L45)

Technical details response for security implementation

## Properties

### architecture

> **architecture**: `object`

Defined in: [services/securityMetricsService.ts:46](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/services/securityMetricsService.ts#L46)

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

Defined in: [services/securityMetricsService.ts:55](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/services/securityMetricsService.ts#L55)

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

Defined in: [services/securityMetricsService.ts:65](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/services/securityMetricsService.ts#L65)

Technology stack by component (availability, integrity, confidentiality)
