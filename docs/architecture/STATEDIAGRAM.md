# CIA Compliance Manager State Diagrams

This document contains state diagrams that illustrate key states and transitions within the CIA Compliance Manager.

## Security Profile State Diagram

**Business Focus:** Demonstrates how organizations can progress through increasingly mature security implementations, with corresponding improvements in compliance status and risk reduction.

**Security Focus:** Illustrates the relationship between security controls implementation and resulting risk posture, showing clear transitions between different security maturity levels.

```mermaid
stateDiagram-v2
    [*] --> NoSecurity: Initialize

    state NoSecurity {
      Security Level: None
      Compliance: Non-Compliant
      Risk: Critical
    }

    state BasicSecurity {
      Security Level: Low
      Compliance: Minimal
      Risk: High
    }

    state ModerateSecurity {
      Security Level: Moderate
      Compliance: Partial
      Risk: Medium
    }

    state HighSecurity {
      Security Level: High
      Compliance: Standard
      Risk: Low
    }

    state VeryHighSecurity {
      Security Level: Very High
      Compliance: Full
      Risk: Minimal
    }

    NoSecurity --> BasicSecurity: Implement Basic Controls
    BasicSecurity --> ModerateSecurity: Upgrade to Moderate
    ModerateSecurity --> HighSecurity: Upgrade to High
    HighSecurity --> VeryHighSecurity: Upgrade to Very High

    VeryHighSecurity --> HighSecurity: Reduce Security
    HighSecurity --> ModerateSecurity: Reduce Security
    ModerateSecurity --> BasicSecurity: Reduce Security
    BasicSecurity --> NoSecurity: Remove Controls

    classDef noSecurity fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    classDef basicSecurity fill:#ffb366,stroke:#333,stroke-width:1px,color:white
    classDef moderateSecurity fill:#ffff66,stroke:#333,stroke-width:1px,color:black
    classDef highSecurity fill:#99cc66,stroke:#333,stroke-width:1px,color:white
    classDef veryHighSecurity fill:#66cc66,stroke:#333,stroke-width:1px,color:white

    class NoSecurity noSecurity
    class BasicSecurity basicSecurity
    class ModerateSecurity moderateSecurity
    class HighSecurity highSecurity
    class VeryHighSecurity veryHighSecurity
```

## Compliance Status State Diagram

**Business Focus:** Shows how compliance status evolves based on control implementation, helping organizations visualize their compliance journey and the steps needed to achieve full compliance.

**Regulatory Focus:** Illustrates the assessment workflow and status changes that occur during compliance evaluation, including the relationship between control implementation and compliance achievement.

```mermaid
stateDiagram-v2
    [*] --> Initial: Start Assessment

    state Initial {
      No compliance checks run
    }

    state NonCompliant {
      Status: Non-Compliant
      Risk Level: High
      Frameworks: 0%
    }

    state PartiallyCompliant {
      Status: Partially Compliant
      Risk Level: Medium
      Frameworks: Varies
    }

    state Compliant {
      Status: Compliant
      Risk Level: Low
      Frameworks: 100%
    }

    Initial --> NonCompliant: Insufficient Controls
    Initial --> PartiallyCompliant: Some Controls
    Initial --> Compliant: All Required Controls

    NonCompliant --> PartiallyCompliant: Add Controls
    PartiallyCompliant --> Compliant: Complete Implementation

    Compliant --> PartiallyCompliant: Controls Degraded
    PartiallyCompliant --> NonCompliant: Controls Removed

    NonCompliant --> [*]: End Assessment
    PartiallyCompliant --> [*]: End Assessment
    Compliant --> [*]: End Assessment

    classDef initial fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black
    classDef nonCompliant fill:#ff6666,stroke:#333,stroke-width:1px,color:white
    classDef partiallyCompliant fill:#ffcc66,stroke:#333,stroke-width:1px,color:black
    classDef compliant fill:#66cc66,stroke:#333,stroke-width:1px,color:white

    class Initial initial
    class NonCompliant nonCompliant
    class PartiallyCompliant partiallyCompliant
    class Compliant compliant
```

These state diagrams illustrate the different security states a system can transition through and how the compliance status changes based on the implementation of security controls. They help visualize the progression from low to high security levels and the corresponding changes in compliance status. The color scheme provides immediate visual feedback about the risk level and compliance status:

- Red indicates critical/high risk or non-compliance
- Orange/Yellow represents moderate risk or partial compliance
- Green shows low/minimal risk or full compliance
- Blue is used for neutral or initial states
