[**CIA Compliance Manager — Markdown Documentation v1.1.82**](../../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../../modules.md) / [components/widgets/implementationguide/ImplementationGuidancePanel](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`ImplementationGuidancePanelProps`](../../../../../types/componentPropExports/interfaces/ImplementationGuidancePanelProps.md)\>

Defined in: [components/widgets/implementationguide/ImplementationGuidancePanel.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/18eb0e178e70b2f5a83fed4363f4edc4f8dd7a1b/src/components/widgets/implementationguide/ImplementationGuidancePanel.tsx#L31)

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
