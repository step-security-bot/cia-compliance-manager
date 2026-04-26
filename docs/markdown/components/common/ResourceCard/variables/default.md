[**CIA Compliance Manager — Markdown Documentation v1.1.59**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/ResourceCard](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<`ResourceCardProps`\>

Defined in: [components/common/ResourceCard.tsx:66](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/components/common/ResourceCard.tsx#L66)

Compact, color-coded resource card.

Densely packed dashboards forced us to constrain card content:
- Title is clamped to 2 lines (no horizontal overflow on long titles).
- Type badge is constrained in width and clipped with ellipsis.
- Description is truncated to ≤100 chars (preserved for existing test).
- Tags are limited to 3 visible tags with a "+N" indicator for the rest.
- A left accent border encodes the CIA component (purple / green / blue).
