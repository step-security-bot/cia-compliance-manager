[**CIA Compliance Manager — UML Diagrams v1.1.43**](../../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../../modules.md) / [components/widgets/implementationguide/ImplementationGuidancePanel](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`ImplementationGuidancePanelProps`](../../../../../types/componentPropExports/interfaces/ImplementationGuidancePanelProps.md)\>

Defined in: [components/widgets/implementationguide/ImplementationGuidancePanel.tsx:31](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/components/widgets/implementationguide/ImplementationGuidancePanel.tsx#L31)

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
