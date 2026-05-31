[**CIA Compliance Manager — Markdown Documentation v1.1.81**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [constants/testIds](../README.md) / createTestId

# Function: createTestId()

> **createTestId**(...`parts`): `string`

Defined in: [constants/testIds.ts:45](https://github.com/Hack23/cia-compliance-manager/blob/8fa41915ca9153d5689c4d663292dcfd3d6de4ad/src/constants/testIds.ts#L45)

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
