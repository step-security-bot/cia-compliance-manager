[**CIA Compliance Manager — UML Diagrams v1.1.65**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/accessibility](../README.md) / announceToScreenReader

# Function: announceToScreenReader()

> **announceToScreenReader**(`message`, `politeness?`): `void`

Defined in: [utils/accessibility.ts:537](https://github.com/Hack23/cia-compliance-manager/blob/77dc8b893bfd5ae3bdbf0f6fc651128f655bd7a7/src/utils/accessibility.ts#L537)

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
