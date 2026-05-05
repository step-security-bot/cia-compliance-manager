[**CIA Compliance Manager — Markdown Documentation v1.1.64**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [constants/testIds](../README.md) / createTestId

# Function: createTestId()

> **createTestId**(...`parts`): `string`

Defined in: [constants/testIds.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/constants/testIds.ts#L53)

Generate hierarchical test ID from parts

## Parameters

### parts

...`string`[]

Array of ID parts to combine

## Returns

`string`

Formatted test ID in kebab-case

## Examples

```ts
createTestId('cost', 'estimation', 'button', 'submit')
// Returns: 'cost-estimation-button-submit'
```

```ts
createTestId('widget', 'Security Level')
// Returns: 'widget-security-level'
```
