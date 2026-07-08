[**CIA Compliance Manager — UML Diagrams v1.1.104**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [utils/formatUtils](../README.md) / formatDate

# Function: formatDate()

> **formatDate**(`date`, `options?`): `string`

Defined in: [utils/formatUtils.ts:330](https://github.com/Hack23/cia-compliance-manager/blob/c7d5254d855bc10f378adc2213f7487f1b036e2d/src/utils/formatUtils.ts#L330)

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
