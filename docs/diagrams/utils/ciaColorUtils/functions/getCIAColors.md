[**CIA Compliance Manager — UML Diagrams v1.1.85**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/ciaColorUtils](../README.md) / getCIAColors

# Function: getCIAColors()

> **getCIAColors**(`component`): [`CIAColors`](../interfaces/CIAColors.md)

Defined in: [utils/ciaColorUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/612cf447fc0534e6658cb45923adb133997d9d57/src/utils/ciaColorUtils.ts#L31)

Get consistent color classes for CIA components

## Parameters

### component

[`CIAComponent`](../../../types/cia/type-aliases/CIAComponent.md)

The CIA component type

## Returns

[`CIAColors`](../interfaces/CIAColors.md)

Object with Tailwind color classes for different uses

## Example

```typescript
const colors = getCIAColors('confidentiality');
<div className={cn(colors.bg, colors.border)}>
  Confidentiality Content
</div>
```
