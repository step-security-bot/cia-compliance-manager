[**CIA Compliance Manager — UML Diagrams v1.1.50**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [types/tabs](../README.md) / UseTabsOptions

# Interface: UseTabsOptions

Defined in: [types/tabs.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/types/tabs.ts#L56)

Options for the useTabs hook

## Properties

### initialTab?

> `optional` **initialTab?**: `string`

Defined in: [types/tabs.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/types/tabs.ts#L58)

Initial active tab ID (defaults to first tab if not specified)

***

### onChange?

> `optional` **onChange?**: (`tabId`) => `void`

Defined in: [types/tabs.ts:61](https://github.com/Hack23/cia-compliance-manager/blob/0596f77c548db1bdb6aac53bc43b69ece0d44bff/src/types/tabs.ts#L61)

Callback when tab changes

#### Parameters

##### tabId

`string`

#### Returns

`void`
