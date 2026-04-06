[**CIA Compliance Manager — UML Diagrams v1.1.46**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [constants/testIds](../README.md) / createTestId

# Function: createTestId()

> **createTestId**(...`parts`): `string`

Defined in: [constants/testIds.ts:53](https://github.com/Hack23/cia-compliance-manager/blob/3c2111b159a69ffb9dbeb7d56f278f1f19203de4/src/constants/testIds.ts#L53)

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
