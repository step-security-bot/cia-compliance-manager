[**CIA Compliance Manager — Markdown Documentation v1.1.48**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/widget-props](../README.md) / SecurityVisualizationWidgetProps

# Type Alias: SecurityVisualizationWidgetProps

> **SecurityVisualizationWidgetProps** = [`AllCIAComponentsProps`](../interfaces/AllCIAComponentsProps.md)

Defined in: [types/widget-props.ts:763](https://github.com/Hack23/cia-compliance-manager/blob/3c37deec8b67c1a91d7d51d274964a1a674bf3b7/src/types/widget-props.ts#L763)

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
