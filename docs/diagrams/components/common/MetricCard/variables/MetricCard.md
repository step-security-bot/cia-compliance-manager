[**CIA Compliance Manager — UML Diagrams v1.1.103**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/MetricCard](../README.md) / MetricCard

# Variable: MetricCard

> `const` **MetricCard**: `React.FC`\<`MetricCardProps`\>

Defined in: [components/common/MetricCard.tsx:49](https://github.com/Hack23/cia-compliance-manager/blob/f5d6fc63c080fb7a03445a3cfec1e22f1b9e04a0/src/components/common/MetricCard.tsx#L49)

Reusable card component for displaying key metrics

## Business Perspective

This component presents key security metrics in a consistent,
easy-to-scan format. Standardized metric cards help stakeholders
quickly understand critical security indicators. 📊

**DESIGN SYSTEM**: Uses Tailwind classes only - no inline styles.
Follows 8px grid system (p-sm=8px minimum) for consistent spacing.

## Example

```tsx
<MetricCard
  label="Uptime Target"
  value="99.9"
  unit="%"
  icon="⏱️"
  description="Expected system availability"
  variant="success"
  testId="uptime-metric"
/>
```
