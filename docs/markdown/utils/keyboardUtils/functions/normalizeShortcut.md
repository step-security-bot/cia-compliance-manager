[**CIA Compliance Manager — Markdown Documentation v1.1.59**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/keyboardUtils](../README.md) / normalizeShortcut

# Function: normalizeShortcut()

> **normalizeShortcut**(`shortcut`): `string`

Defined in: [utils/keyboardUtils.ts:234](https://github.com/Hack23/cia-compliance-manager/blob/515f932b483ce1f886256c39ce71bb5cda13f205/src/utils/keyboardUtils.ts#L234)

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
