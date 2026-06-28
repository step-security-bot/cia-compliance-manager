[**CIA Compliance Manager — UML Diagrams v1.1.98**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/LoadingSpinner](../README.md) / LoadingSpinner

# Variable: LoadingSpinner

> `const` **LoadingSpinner**: `React.FC`\<[`LoadingSpinnerProps`](../interfaces/LoadingSpinnerProps.md)\>

Defined in: [components/common/LoadingSpinner.tsx:51](https://github.com/Hack23/cia-compliance-manager/blob/2f201a728b15b42b9d8c9bebf9ed16f5d9c05e5e/src/components/common/LoadingSpinner.tsx#L51)

Loading spinner component for indicating loading states

## Business Perspective

Provides consistent visual feedback during data loading operations,
improving user experience by clearly indicating that the application
is working on their request. 🔄

## Technical Perspective

Reusable loading indicator component that maintains visual consistency
across all widgets and screens. Uses Tailwind CSS for styling with
support for different sizes.

## Example

```tsx
// Small spinner
<LoadingSpinner size="sm" />

// Default medium spinner
<LoadingSpinner />

// Large spinner with custom test ID
<LoadingSpinner size="lg" testId="widget-loader" />
```
