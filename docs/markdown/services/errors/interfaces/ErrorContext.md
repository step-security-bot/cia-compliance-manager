[**CIA Compliance Manager — Markdown Documentation v1.1.43**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [services/errors](../README.md) / ErrorContext

# Interface: ErrorContext

Defined in: [services/errors.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/errors.ts#L54)

Context information for errors

## Indexable

> \[`key`: `string`\]: `unknown`

Additional context information

## Properties

### service?

> `optional` **service?**: `string`

Defined in: [services/errors.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/errors.ts#L56)

Service that generated the error

***

### method?

> `optional` **method?**: `string`

Defined in: [services/errors.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/errors.ts#L58)

Method that generated the error

***

### component?

> `optional` **component?**: `string`

Defined in: [services/errors.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/errors.ts#L60)

Component being processed

***

### level?

> `optional` **level?**: `string`

Defined in: [services/errors.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/7480c7701ec22b1ca8552397b5561472bfc309a1/src/services/errors.ts#L62)

Security level being processed
