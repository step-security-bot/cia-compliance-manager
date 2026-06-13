[**CIA Compliance Manager — Markdown Documentation v1.1.88**](../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../modules.md) / [coreConstants](../README.md) / SECURITY\_LEVELS

# Variable: SECURITY\_LEVELS

> `const` **SECURITY\_LEVELS**: `Record`\<`string`, [`SecurityLevel`](../../types/cia/type-aliases/SecurityLevel.md)\>

Defined in: [constants/coreConstants.ts:155](https://github.com/Hack23/cia-compliance-manager/blob/33a6e06f56bdf18af5506272bbd4bc140a490de3/src/constants/coreConstants.ts#L155)

Security level enumeration constants.

Maps friendly constant names to SecurityLevel type values. Use these
constants when working with security levels to avoid string literals
and improve type safety.

## Example

```typescript
// Compare security level
if (currentLevel === SECURITY_LEVELS.HIGH) {
  console.log('High security configured');
}

// Set default level
const [level, setLevel] = useState(SECURITY_LEVELS.MODERATE);
```
