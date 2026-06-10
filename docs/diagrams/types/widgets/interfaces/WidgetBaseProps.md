[**CIA Compliance Manager — UML Diagrams v1.1.86**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widgets](../README.md) / WidgetBaseProps

# Interface: WidgetBaseProps

Defined in: [types/widgets.ts:52](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/widgets.ts#L52)

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

Defined in: [types/widgets.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/widgets.ts#L56)

Optional CSS class name

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/widgets.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/widgets.ts#L61)

Optional test ID for testing

***

### securityLevel?

> `optional` **securityLevel?**: [`SecurityLevel`](../../cia/type-aliases/SecurityLevel.md)

Defined in: [types/widgets.ts:66](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/widgets.ts#L66)

Optional security level for widgets that only need one level
