[**CIA Compliance Manager — Markdown Documentation v1.1.67**](../../../README.md)

***

[CIA Compliance Manager — Markdown Documentation](../../../modules.md) / [types/cia-services](../README.md) / CIADetails

# Interface: CIADetails

Defined in: [types/cia-services.ts:227](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L227)

Core CIA security details interface

This comprehensive interface represents all security details for a specific
security level across availability, integrity, or confidentiality.

## Extended by

- [`AvailabilityDetail`](../../widgets/interfaces/AvailabilityDetail.md)
- [`IntegrityDetail`](../../widgets/interfaces/IntegrityDetail.md)
- [`ConfidentialityDetail`](../../widgets/interfaces/ConfidentialityDetail.md)

## Properties

### description

> **description**: `string`

Defined in: [types/cia-services.ts:229](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L229)

***

### technical

> **technical**: `string`

Defined in: [types/cia-services.ts:230](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L230)

***

### businessImpact

> **businessImpact**: `string`

Defined in: [types/cia-services.ts:231](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L231)

***

### capex?

> `optional` **capex?**: `number`

Defined in: [types/cia-services.ts:234](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L234)

***

### opex?

> `optional` **opex?**: `number`

Defined in: [types/cia-services.ts:235](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L235)

***

### bg?

> `optional` **bg?**: `string`

Defined in: [types/cia-services.ts:238](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L238)

***

### text?

> `optional` **text?**: `string`

Defined in: [types/cia-services.ts:239](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L239)

***

### recommendations

> **recommendations**: `string`[]

Defined in: [types/cia-services.ts:242](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L242)

***

### businessImpactDetails?

> `optional` **businessImpactDetails?**: [`BusinessImpactDetails`](BusinessImpactDetails.md)

Defined in: [types/cia-services.ts:245](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L245)

***

### uptime?

> `optional` **uptime?**: `string`

Defined in: [types/cia-services.ts:248](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L248)

***

### rto?

> `optional` **rto?**: `string`

Defined in: [types/cia-services.ts:249](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L249)

***

### rpo?

> `optional` **rpo?**: `string`

Defined in: [types/cia-services.ts:250](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L250)

***

### mttr?

> `optional` **mttr?**: `string`

Defined in: [types/cia-services.ts:251](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L251)

***

### sla?

> `optional` **sla?**: `string`

Defined in: [types/cia-services.ts:252](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L252)

***

### validationMethod?

> `optional` **validationMethod?**: `string`

Defined in: [types/cia-services.ts:255](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L255)

***

### validationLevel?

> `optional` **validationLevel?**: `string`

Defined in: [types/cia-services.ts:256](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L256)

***

### errorRate?

> `optional` **errorRate?**: `string`

Defined in: [types/cia-services.ts:257](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L257)

***

### protectionMethod?

> `optional` **protectionMethod?**: `string`

Defined in: [types/cia-services.ts:260](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L260)

***

### privacyImpact?

> `optional` **privacyImpact?**: `string`

Defined in: [types/cia-services.ts:261](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L261)

***

### implementationComplexity?

> `optional` **implementationComplexity?**: `string`

Defined in: [types/cia-services.ts:264](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L264)

***

### maintenanceRequirements?

> `optional` **maintenanceRequirements?**: `string`

Defined in: [types/cia-services.ts:265](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L265)

***

### requiredExpertise?

> `optional` **requiredExpertise?**: `string`

Defined in: [types/cia-services.ts:266](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L266)

***

### controlFamily?

> `optional` **controlFamily?**: `string`[]

Defined in: [types/cia-services.ts:267](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L267)

***

### applicableFrameworks?

> `optional` **applicableFrameworks?**: `string`[]

Defined in: [types/cia-services.ts:268](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L268)

***

### businessPerspective?

> `optional` **businessPerspective?**: `string`

Defined in: [types/cia-services.ts:271](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L271)

***

### implementationSteps?

> `optional` **implementationSteps?**: `string`[]

Defined in: [types/cia-services.ts:272](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L272)

***

### effort?

> `optional` **effort?**: [`ImplementationEffort`](ImplementationEffort.md)

Defined in: [types/cia-services.ts:273](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L273)

***

### keyImpact?

> `optional` **keyImpact?**: `string`

Defined in: [types/cia-services.ts:274](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L274)

***

### metric?

> `optional` **metric?**: `string`

Defined in: [types/cia-services.ts:275](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L275)

***

### valuePoints?

> `optional` **valuePoints?**: `string`[]

Defined in: [types/cia-services.ts:276](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L276)

***

### roiEstimate?

> `optional` **roiEstimate?**: [`ROIEstimate`](ROIEstimate.md)

Defined in: [types/cia-services.ts:277](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L277)

***

### implementationConsiderations?

> `optional` **implementationConsiderations?**: `string`

Defined in: [types/cia-services.ts:278](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L278)

***

### securityIcon?

> `optional` **securityIcon?**: `string`

Defined in: [types/cia-services.ts:281](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L281)

***

### complianceImpact?

> `optional` **complianceImpact?**: [`ComplianceImpact`](ComplianceImpact.md)

Defined in: [types/cia-services.ts:282](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L282)

***

### codeExamples?

> `optional` **codeExamples?**: [`CodeExample`](CodeExample.md)[]

Defined in: [types/cia-services.ts:285](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L285)

***

### technicalImplementation?

> `optional` **technicalImplementation?**: [`TechnicalImplementationDetails`](TechnicalImplementationDetails.md)

Defined in: [types/cia-services.ts:286](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L286)

***

### expertise?

> `optional` **expertise?**: `string`

Defined in: [types/cia-services.ts:289](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L289)

***

### timeframe?

> `optional` **timeframe?**: `string`

Defined in: [types/cia-services.ts:290](https://github.com/Hack23/cia-compliance-manager/blob/ecf5f1e7d4d1c31b8c0dc2e884639fdfcbce5261/src/types/cia-services.ts#L290)
