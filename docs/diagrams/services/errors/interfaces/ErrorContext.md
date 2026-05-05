[**CIA Compliance Manager — UML Diagrams v1.1.64**](../../../README.md)

***

[CIA Compliance Manager — UML Diagrams](../../../modules.md) / [services/errors](../README.md) / ErrorContext

# Interface: ErrorContext

Defined in: [services/errors.ts:54](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/services/errors.ts#L54)

Context information for errors

## Indexable

> \[`key`: `string`\]: `unknown`

Additional context information

## Properties

### service?

> `optional` **service?**: `string`

Defined in: [services/errors.ts:56](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/services/errors.ts#L56)

Service that generated the error

***

### method?

> `optional` **method?**: `string`

Defined in: [services/errors.ts:58](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/services/errors.ts#L58)

Method that generated the error

***

### component?

> `optional` **component?**: `string`

Defined in: [services/errors.ts:60](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/services/errors.ts#L60)

Component being processed

***

### level?

> `optional` **level?**: `string`

Defined in: [services/errors.ts:62](https://github.com/Hack23/cia-compliance-manager/blob/3132182b5e653fb389a929289fa4441c76c22e5e/src/services/errors.ts#L62)

Security level being processed
