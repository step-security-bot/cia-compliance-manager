[**CIA Compliance Manager — UML Diagrams v1.1.61**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/componentPropExports](../README.md) / WidgetErrorBoundaryProps

# Interface: WidgetErrorBoundaryProps

Defined in: [types/componentPropExports.ts:372](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/componentPropExports.ts#L372)

## Properties

### children

> **children**: `ReactNode`

Defined in: [types/componentPropExports.ts:376](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/componentPropExports.ts#L376)

Child components to wrap with error boundary

***

### fallback?

> `optional` **fallback?**: `ReactNode`

Defined in: [types/componentPropExports.ts:381](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/componentPropExports.ts#L381)

Optional custom fallback component to display on error

***

### onError?

> `optional` **onError?**: (`error`, `errorInfo`) => `void`

Defined in: [types/componentPropExports.ts:386](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/componentPropExports.ts#L386)

Optional callback when an error is caught

#### Parameters

##### error

`Error`

##### errorInfo

`ErrorInfo`

#### Returns

`void`

***

### widgetName?

> `optional` **widgetName?**: `string`

Defined in: [types/componentPropExports.ts:391](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/componentPropExports.ts#L391)

Optional widget name for error messages

***

### testId?

> `optional` **testId?**: `string`

Defined in: [types/componentPropExports.ts:396](https://github.com/Hack23/cia-compliance-manager/blob/02ebfb86f7d3e96b15edf3dc4b91da2f5f6a3a27/src/types/componentPropExports.ts#L396)

Optional test ID for automated testing
