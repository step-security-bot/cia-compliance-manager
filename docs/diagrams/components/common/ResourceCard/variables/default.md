[**CIA Compliance Manager — UML Diagrams v1.1.81**](../../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../../modules.md) / [components/common/ResourceCard](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<`ResourceCardProps`\>

Defined in: [components/common/ResourceCard.tsx:65](https://github.com/Hack23/cia-compliance-manager/blob/8fa41915ca9153d5689c4d663292dcfd3d6de4ad/src/components/common/ResourceCard.tsx#L65)

Compact, color-coded resource card.

Densely packed dashboards forced us to constrain card content:
- Title is clamped to 2 lines (no horizontal overflow on long titles).
- Type badge is constrained in width and clipped with ellipsis.
- Description is truncated to ≤100 chars (preserved for existing test).
- Tags are limited to 3 visible tags with a "+N" indicator for the rest.
- A left accent border encodes the CIA component (purple / green / blue).
