[**CIA Compliance Manager — Markdown Documentation v1.1.105**](../../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../../modules.md) / [components/widgets/implementationguide/ImplementationGuidancePanel](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`ImplementationGuidancePanelProps`](../../../../../types/componentPropExports/interfaces/ImplementationGuidancePanelProps.md)\>

Defined in: [components/widgets/implementationguide/ImplementationGuidancePanel.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/337ef8ec401e219f25fa6640ab05b7671e3a9819/src/components/widgets/implementationguide/ImplementationGuidancePanel.tsx#L31)

ImplementationGuidancePanel component - displays implementation tips and guidance

## Business Perspective

Provides actionable implementation guidance to security teams, helping them
understand effort requirements and common challenges for each CIA component.
Improves implementation success rates and resource planning. 🎯

## Technical Perspective

Extracted from SecurityResourcesWidget to improve maintainability and reduce file size.
Provides component-specific implementation guidance for the CIA triad with compact
spacing and progressive disclosure patterns.

## Component

## Example

```tsx
<ImplementationGuidancePanel
  implementationGuides={guides}
  availabilityLevel="High"
  integrityLevel="Moderate"
  confidentialityLevel="High"
/>
```
