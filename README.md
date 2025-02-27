# CIA Compliance Manager

The CIA Compliance Manager is a comprehensive application designed to help organizations assess, implement, and manage security controls across the CIA triad (Confidentiality, Integrity, and Availability). It provides detailed security assessments, cost estimation tools, business impact analysis, and technical implementation guidance to support organizations in achieving their security objectives within budget constraints.

## Badges

[![License](https://img.shields.io/github/license/Hack23/cia-compliance-manager.svg)](https://github.com/Hack23/cia-compliance-manager/raw/master/LICENSE.md) [![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/Hack23/cia-compliance-manager/badge)](https://scorecard.dev/viewer/?uri=github.com/Hack23/cia-compliance-manager)
[![Scorecard supply-chain security](https://github.com/Hack23/cia-compliance-manager/actions/workflows/scorecards.yml/badge.svg?branch=main)](https://github.com/Hack23/cia-compliance-manager/actions/workflows/scorecards.yml)

## Executive Summary

### Security Level Summary

- **Basic**: Minimal investment, low protection, and high risk of downtime or data breaches. Suitable for non-critical or public-facing systems.
- **Moderate**: A balanced approach to cost and protection, good for mid-sized companies that need compliance without overspending on redundant systems.
- **High**: Required for businesses where data integrity, uptime, and confidentiality are critical. High costs, but justified in regulated industries like finance, healthcare, or e-commerce.
- **Very High**: Over-the-top protection and availability designed for mission-critical systems, such as those in defense or high-security finance. Extremely high CAPEX and OPEX.

### Choosing the Right Level for Your Business

- **Low-Cost Solutions**: If your business doesn't handle sensitive data or rely heavily on real-time services, Basic options may suffice. However, be aware of the risks of downtime and data inaccuracy.
- **Balanced Approach**: For businesses with some regulatory requirements (e.g., GDPR, HIPAA), Moderate levels provide good protection at a reasonable cost.
- **High-Value Data or Uptime-Dependent Business**: If service availability or data accuracy is critical, or if you're in a regulated industry, consider High or Very High options.
- **Mission-Critical Systems**: For defense contractors, financial institutions, or businesses that cannot tolerate downtime, Very High levels with quantum-safe encryption and multi-site redundancy are essential.

### Business Impact Analysis

#### Purpose

The Business Impact Analysis (BIA) component helps organizations:

- Identify critical business functions and their dependencies
- Quantify financial and operational impacts of security incidents
- Establish recovery time objectives (RTOs) and recovery point objectives (RPOs)
- Prioritize security investments based on potential business impact
- Align security controls with business criticality

#### Results

A completed Business Impact Analysis provides:

- Clear visibility into which systems require higher security levels
- Quantifiable metrics for justifying security investments to stakeholders
- Risk-based approach to allocating security resources
- Documentation for compliance and regulatory requirements
- Foundation for disaster recovery and business continuity planning

## Core Concepts

### Security Assessment Framework

The application uses the CIA triad (Confidentiality, Integrity, and Availability) as its foundation for security assessment. Each component can be evaluated at different security levels:

- **None**: No security controls implemented
- **Basic**: Minimal security controls to address common threats
- **Moderate**: Standard security controls suitable for most business applications
- **High**: Enhanced security controls for sensitive systems and data
- **Very High**: Maximum security controls for critical systems and highly sensitive data

Each level includes specific controls, technical requirements, and implementation considerations that align with industry standards and best practices.

### Detailed CIA Triad Components

#### 1. Availability

| Level     | Description                                                    | CAPEX / OPEX | Business Impact                                                                                         | Technical Details                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | -------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Basic     | Backup & Restore: Manual recovery, long RTO (~95% uptime)      | 5% / 5%      | Suitable for non-critical systems. Downtime can be costly for e-commerce and uptime-dependent services. | **Technical Implementation**: Manual backup procedures, basic recovery documentation, no redundancy.<br>**CAPEX Drivers**: Low initial investment in basic backup tools and minimal documentation.<br>**OPEX Drivers**: Manual monitoring, reactive troubleshooting, and recovery efforts as needed.                                                                                                                                                               |
| Moderate  | Pilot Light: Standby systems, automated recovery (~99% uptime) | 15% / 15%    | Works for mid-level critical systems, with faster recovery but some SPOFs remain.                       | **Technical Implementation**: Core systems pre-configured with automated recovery scripts, limited redundancy.<br>**CAPEX Drivers**: Redundant infrastructure components, automation tool licenses, initial configuration.<br>**OPEX Drivers**: Regular testing of failover processes, maintenance of standby systems, part-time monitoring.                                                                                                                       |
| High      | Warm Standby: Fast recovery, limited SPOFs (~99.9% uptime)     | 25% / 40%    | Ideal for businesses with high uptime needs, such as online retailers.                                  | **Technical Implementation**: Partially active redundant systems, real-time data replication, automated failover mechanisms.<br>**CAPEX Drivers**: Advanced replication technology, redundant hardware/cloud resources, high-bandwidth connections.<br>**OPEX Drivers**: 24/7 monitoring, regular failover testing, maintenance of parallel systems, specialized staff.                                                                                            |
| Very High | Multi-Site Active/Active: Real-time failover (~99.99% uptime)  | 60% / 70%    | Necessary for mission-critical industries (e.g., finance, healthcare). No SPOFs, continuous uptime.     | **Technical Implementation**: Fully redundant multi-region deployment, global load balancing, automatic failover with zero data loss.<br>**CAPEX Drivers**: Multiple identical infrastructures across geographic regions, advanced orchestration tools, complex networking equipment.<br>**OPEX Drivers**: Dedicated site reliability engineering team, continuous monitoring, regular cross-region testing, high bandwidth costs, complex maintenance procedures. |

#### 2. Integrity

| Level     | Description                                                      | CAPEX / OPEX | Business Impact                                                                                                | Technical Details                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| --------- | ---------------------------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Basic     | Manual Validation: Minimal checks, low auditability              | 5% / 10%     | Risk of data inaccuracies and compliance failures. Suitable for low-compliance businesses.                     | **Technical Implementation**: Manual data entry verification, basic access logs, simple backup strategies.<br>**CAPEX Drivers**: Minimal documentation systems, basic error checking tools.<br>**OPEX Drivers**: Manual audit procedures, error correction, and occasional compliance reviews.                                                                                                                                                        |
| Moderate  | Automated Validation: Enhanced accuracy and auditability         | 20% / 20%    | Meets basic compliance for industries like retail or general business (e.g., GDPR, SOX compliance).            | **Technical Implementation**: Automated data validation rules, audit logging systems, error detection mechanisms.<br>**CAPEX Drivers**: Data validation tools, audit software licenses, initial rule configuration.<br>**OPEX Drivers**: Regular review of validation rules, compliance reporting, log analysis, and error remediation.                                                                                                               |
| High      | Blockchain Validation: Immutable data records, high traceability | 35% / 50%    | Ideal for highly regulated industries (finance, healthcare). Provides full auditability and data immutability. | **Technical Implementation**: Distributed ledger solutions, cryptographic verification, complete audit trails.<br>**CAPEX Drivers**: Blockchain infrastructure, custom development, integration with existing systems, specialized software.<br>**OPEX Drivers**: High computing resources, specialized blockchain engineers, continuous verification processes, complex reporting mechanisms.                                                        |
| Very High | Smart Contracts: Real-time validation, full audit traceability   | 60% / 70%    | Perfect for industries needing full real-time data validation, like stock exchanges and defense contractors.   | **Technical Implementation**: Smart contract execution, automated governance rules, advanced cryptography, real-time compliance verification.<br>**CAPEX Drivers**: Advanced distributed systems, custom smart contract development, extensive integration efforts, regulatory review.<br>**OPEX Drivers**: Dedicated compliance teams, continuous smart contract monitoring, regular code audits, complex system upgrades, high computational costs. |

#### 3. Confidentiality

| Level     | Description                                                      | CAPEX / OPEX | Business Impact                                                                           | Technical Details                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------- | ---------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Basic     | Public Data: No encryption or access control                     | 5% / 5%      | Suitable for public-facing data, no protection needed.                                    | **Technical Implementation**: Basic HTTPS, simple authentication, minimal access controls.<br>**CAPEX Drivers**: Standard SSL certificates, basic user management systems.<br>**OPEX Drivers**: Minimal maintenance, occasional credential management, basic security reviews.                                                                                                                                                                                                                         |
| Moderate  | Restricted Data: AES-256 encryption and basic monitoring         | 15% / 20%    | Works for sensitive internal data (e.g., HR files, internal documents).                   | **Technical Implementation**: Strong encryption at rest and in transit, role-based access control, security monitoring.<br>**CAPEX Drivers**: Encryption solutions, access management tools, security monitoring setup.<br>**OPEX Drivers**: Regular access reviews, key management, security event monitoring, user provisioning/deprovisioning.                                                                                                                                                      |
| High      | Confidential Data: MFA, robust encryption, continuous monitoring | 30% / 40%    | Essential for industries handling customer or financial data (e.g., banking, healthcare). | **Technical Implementation**: Multi-factor authentication systems, advanced encryption, SIEM solutions, DLP controls, privileged access management.<br>**CAPEX Drivers**: Enterprise security tools, MFA infrastructure, monitoring systems, integration with existing systems.<br>**OPEX Drivers**: 24/7 security operations, regular penetration testing, compliance audits, security training, dedicated security staff.                                                                            |
| Very High | Secret Data: Quantum-safe encryption, 24/7 monitoring            | 50% / 60%    | Required for highly classified data (e.g., military, government).                         | **Technical Implementation**: Quantum-resistant algorithms, hardware security modules, air-gapped systems, advanced threat detection, physical security controls.<br>**CAPEX Drivers**: Specialized encryption hardware, custom security solutions, secure facilities, advanced intrusion prevention systems.<br>**OPEX Drivers**: Dedicated security teams, continuous monitoring, regular security clearances, physical security staff, frequent algorithm updates, extensive compliance procedures. |

### Technical Considerations

- **Availability**: Understanding SPOFs and autoscaling is critical. Moving from Basic to High removes single points of failure and introduces real-time failover capabilities.
- **Integrity**: The jump from manual validation to blockchain dramatically increases data accuracy and ensures immutability, vital for industries dealing with transactional data.
- **Confidentiality**: Moving from public data to secret data introduces quantum-safe encryption, an emerging need for high-security industries to safeguard against quantum computing threats.

### Cost Management

The application helps organizations understand and plan security investments through two main cost categories:

#### CAPEX (Capital Expenditure)

One-time investment costs including:

- Initial software development and engineering
- Infrastructure setup and configuration
- System design and architecture planning
- Initial implementation and deployment
- Hardware purchases and installation
- Security tool acquisition

#### OPEX (Operational Expenditure)

Ongoing operational costs including:

- Maintenance and system administration
- Security monitoring and incident response
- Technical support and help desk services
- Recurring infrastructure costs (cloud, hosting, etc.)
- Updates, patches, and security upgrades
- Compliance auditing and reporting
- Staff training and awareness programs

### Cost Estimation Framework

To provide accurate and consistent cost estimates, the CIA Compliance Manager uses a standardized framework that considers:

1. **Baseline IT Budget**: All CAPEX and OPEX percentages are calculated against the organization's total IT budget
2. **Implementation Timeline**: Costs are spread over an implementation period (typically 1-3 years)
3. **Industry Factors**: Cost multipliers for specific industries based on regulatory requirements
4. **Organization Size**: Scaling factors that adjust estimates based on company size and complexity
5. **Existing Infrastructure**: Credits for existing security controls that can be leveraged

The application provides both aggregated and detailed views of cost estimates, allowing decision-makers to:

- Compare different security level combinations
- Identify cost drivers and optimization opportunities
- Create multi-year security investment roadmaps
- Justify security investments with specific business benefits

## Features

- **Dynamic Security Assessment**: Configure and assess security requirements across the CIA triad
- **Cost Estimation Tools**: Calculate both CAPEX and OPEX based on selected security levels with detailed breakdown
- **Business Impact Analysis**: Evaluate potential impacts of security incidents on operations and quantify potential losses
- **Technical Implementation Guidance**: Detailed implementation recommendations for each security level with technology suggestions
- **Compliance Mapping**: Map controls to common compliance frameworks (GDPR, HIPAA, SOC2, etc.)
- **Customizable Security Levels**: Tailor security controls to your organization's specific needs and risk profile
- **Reporting and Documentation**: Generate comprehensive reports for stakeholders at technical and executive levels
- **ROI Calculator**: Measure return on investment for security implementations against potential breach costs

## Installation

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
