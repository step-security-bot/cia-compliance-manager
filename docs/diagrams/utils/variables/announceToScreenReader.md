[**CIA Compliance Manager — UML Diagrams v1.1.86**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:43](https://github.com/Hack23/cia-compliance-manager/blob/291151a4aaa6ab487167f02ba32ad558685a3eca/src/utils/index.ts#L43)

Announce a message to screen readers using ARIA live region
Uses a singleton live region to prevent duplicate announcements

## Parameters

### message

`string`

Message to announce

### politeness?

`"polite"` \| `"assertive"`

ARIA live politeness level

## Returns

`void`
