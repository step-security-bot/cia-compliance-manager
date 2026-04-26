[**CIA Compliance Manager — UML Diagrams v1.1.59**](../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../modules.md) / [utils](../README.md) / announceToScreenReader

# Variable: announceToScreenReader

> **announceToScreenReader**: (`message`, `politeness`) => `void`

Defined in: [utils/index.ts:49](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/utils/index.ts#L49)

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
