[**CIA Compliance Manager — UML Diagrams v1.1.58**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatDate

# Function: formatDate()

> **formatDate**(`date`, `options?`): `string`

Defined in: [utils/formatUtils.ts:345](https://github.com/Hack23/cia-compliance-manager/blob/84222a9962d7a7a5e28ce024c77c70b4ccc10b90/src/utils/formatUtils.ts#L345)

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
