[**CIA Compliance Manager — Markdown Documentation v1.1.38**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [utils/keyboardUtils](../README.md) / getPlatformShortcut

# Function: getPlatformShortcut()

> **getPlatformShortcut**(`defaultKeys`, `platformKeys?`): `string`

Defined in: [utils/keyboardUtils.ts:383](https://github.com/Hack23/cia-compliance-manager/blob/e53f32b24281901e3964b603dea2bfa4c23bab48/src/utils/keyboardUtils.ts#L383)

Get keyboard shortcut for current platform

## Parameters

### defaultKeys

`string`

Default key combination

### platformKeys?

`Partial`\<`Record`\<[`Platform`](../../../types/keyboard/type-aliases/Platform.md), `string`\>\>

Platform-specific overrides

## Returns

`string`

Key combination for current platform
