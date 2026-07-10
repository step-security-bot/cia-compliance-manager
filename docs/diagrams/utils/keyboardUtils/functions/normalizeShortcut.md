[**CIA Compliance Manager — UML Diagrams v1.1.106**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/keyboardUtils](../README.md) / normalizeShortcut

# Function: normalizeShortcut()

> **normalizeShortcut**(`shortcut`): `string`

Defined in: [utils/keyboardUtils.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/122721fe21088cc17896bc69556bad86b47a1c48/src/utils/keyboardUtils.ts#L227)

Normalize shortcut string for comparison

Maintains the canonical modifier key order (ctrl, cmd, meta, shift, alt)
to ensure consistent matching with getKeyCombination output.

## Parameters

### shortcut

`string`

The shortcut string (e.g., 'Ctrl+K', 'cmd+k')

## Returns

`string`

Normalized shortcut string
