[**CIA Compliance Manager — UML Diagrams v1.1.98**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/widget-props](../README.md) / SecurityVisualizationWidgetProps

# Type Alias: SecurityVisualizationWidgetProps

> **SecurityVisualizationWidgetProps** = [`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md)

Defined in: [types/widget-props.ts:762](https://github.com/Hack23/cia-compliance-manager/blob/2f201a728b15b42b9d8c9bebf9ed16f5d9c05e5e/src/types/widget-props.ts#L762)

Props for SecurityVisualizationWidget component

Visualizes security posture with interactive charts based on
CIA component security levels.

## Example

```typescript
<SecurityVisualizationWidget
  availabilityLevel="High"
  integrityLevel="Very High"
  confidentialityLevel="Moderate"
/>
```
