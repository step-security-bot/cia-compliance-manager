[**CIA Compliance Manager — Markdown Documentation v1.1.47**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/ciaColorUtils](../README.md) / getCIAColors

# Function: getCIAColors()

> **getCIAColors**(`component`): [`CIAColors`](../interfaces/CIAColors.md)

Defined in: [utils/ciaColorUtils.ts:31](https://github.com/Hack23/cia-compliance-manager/blob/0a914ff8809ea300c13e0a51b2ef582dc0e7a4a4/src/utils/ciaColorUtils.ts#L31)

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
