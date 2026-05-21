[**CIA Compliance Manager — UML Diagrams v1.1.77**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatDate

# Function: formatDate()

> **formatDate**(`date`, `options?`): `string`

Defined in: [utils/formatUtils.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/bb6771f1780ae2f20879ca12f020c45fa6e4a1e2/src/utils/formatUtils.ts#L330)

Formats a date using the browser's local formatting

## Business Perspective

Consistent date formatting improves the readability of audit records,
compliance documentation, and implementation timelines. 📅

## Parameters

### date

`string` \| `Date`

Date object or string to format

### options?

`DateTimeFormatOptions` = `...`

Date formatting options

## Returns

`string`

Formatted date string
