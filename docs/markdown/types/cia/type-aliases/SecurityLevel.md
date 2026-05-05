[**CIA Compliance Manager — Markdown Documentation v1.1.64**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia](../README.md) / SecurityLevel

# Type Alias: SecurityLevel

> **SecurityLevel** = `"None"` \| `"Low"` \| `"Moderate"` \| `"High"` \| `"Very High"`

Defined in: [types/cia.ts:38](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/types/cia.ts#L38)

Security levels available for CIA triad components

Each level represents increasing security controls and associated costs:
- **None**: No security controls (not recommended for production)
- **Low**: Basic security controls for low-risk systems
- **Moderate**: Standard controls for typical business systems (recommended baseline)
- **High**: Enhanced controls for sensitive systems
- **Very High**: Maximum controls for critical systems

## Example

```typescript
const level: SecurityLevel = 'Moderate';
const criticalLevel: SecurityLevel = 'Very High';
```
