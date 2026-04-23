[**CIA Compliance Manager — Markdown Documentation v1.1.56**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widgets](../README.md) / WidgetBaseProps

# Interface: WidgetBaseProps

Defined in: [types/widgets.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/947de98b1b44a8456f3ca81571083fd214d2e336/src/types/widgets.ts#L52)

Base props for all widgets

## Business Perspective

All widgets in the application share these core properties, enabling
consistent styling, testing, and interactive capabilities. This creates
a unified dashboard experience for security officers and executives. 🎨

## Extended by

- [`CIABaseWidgetProps`](CIABaseWidgetProps.md)
- [`ComplianceStatusWidgetProps`](ComplianceStatusWidgetProps.md)
- [`SecurityComponentProps`](SecurityComponentProps.md)
- [`SecurityLevelSelectorProps`](SecurityLevelSelectorProps.md)
- [`ComponentImpactWidgetProps`](ComponentImpactWidgetProps.md)

## Properties

### className?

> `optional` **className?**: `string`

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/947de98b1b44a8456f3ca81571083fd214d2e336/src/types/widgets.ts#L56)

Optional CSS class name

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/947de98b1b44a8456f3ca81571083fd214d2e336/src/types/widgets.ts#L61)

Optional test ID for testing

***

### securityLevel?

> `optional` **securityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/947de98b1b44a8456f3ca81571083fd214d2e336/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level
