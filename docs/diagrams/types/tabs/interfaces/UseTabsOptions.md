[**CIA Compliance Manager — UML Diagrams v1.1.86**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/tabs](../README.md) / UseTabsOptions

# Interface: UseTabsOptions

Defined in: [types/tabs.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/tabs.ts#L56)

Options for the useTabs hook

## Properties

### initialTab?

> `optional` **initialTab?**: `string`

Defined in: [types/tabs.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/tabs.ts#L58)

Initial active tab ID (defaults to first tab if not specified)

***

### onChange?

> `optional` **onChange?**: (`tabId`) => `void`

Defined in: [types/tabs.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/types/tabs.ts#L61)

Callback when tab changes

#### Parameters

##### tabId

`string`

#### Returns

`void`
