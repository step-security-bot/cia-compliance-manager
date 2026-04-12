[**CIA Compliance Manager — Markdown Documentation v1.1.50**](../../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../../modules.md) / [components/common/CodeBlock](../README.md) / default

# Variable: default

> `const` **default**: `React.FC`\<[`CodeBlockProps`](../../../../types/componentPropExports/interfaces/CodeBlockProps.md)\>

Defined in: [components/common/CodeBlock.tsx:120](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/components/common/CodeBlock.tsx#L120)

CodeBlock component - displays code with optional syntax highlighting and copy functionality

## Business Perspective

Provides clear, readable code examples to technical teams implementing
security controls, improving comprehension and reducing implementation errors.
Critical for effective knowledge transfer and documentation. 📝

## Technical Perspective

This component provides theme-aware code display without external dependencies.
It uses simple regex-based syntax highlighting for common languages (TypeScript,
JavaScript, Python, Bash). Supports copy-to-clipboard functionality and optional
line numbers.

**Security Note**: The 'code' prop should only contain trusted content. This
component uses dangerouslySetInnerHTML for syntax highlighting with HTML spans.
While HTML characters are escaped (&, <, >) before processing, the code input
should not come from untrusted user sources to prevent potential XSS risks.

## Component

## Example

```tsx
<CodeBlock
  language="typescript"
  code={`const hello = "world";\nconsole.log(hello);`}
  showLineNumbers={true}
  copyable={true}
/>
```
