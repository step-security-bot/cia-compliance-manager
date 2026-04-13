[**CIA Compliance Manager — UML Diagrams v1.1.51**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/testIds](../README.md) / createTestId

# Function: createTestId()

> **createTestId**(...`parts`): `string`

Defined in: [constants/testIds.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/86b846d7899a64ef6107abca6a5f64502752b5cc/src/constants/testIds.ts#L53)

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
