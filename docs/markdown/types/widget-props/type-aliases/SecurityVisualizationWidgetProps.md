[**CIA Compliance Manager — Markdown Documentation v1.1.101**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / SecurityVisualizationWidgetProps

# Type Alias: SecurityVisualizationWidgetProps

> **SecurityVisualizationWidgetProps** = [`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md)

Defined in: [types/widget-props.ts:762](https://github.com/Hack23/cia-compliance-manager/blob/6723306427ccc04dd3d118787ac833aded0c707b/src/types/widget-props.ts#L762)

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
