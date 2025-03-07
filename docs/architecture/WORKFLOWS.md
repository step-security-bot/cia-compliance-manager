# CIA Compliance Manager CI/CD Workflows

This document describes the CI/CD workflows implemented for the CIA Compliance Manager project, illustrating the automated processes for code quality, security checks, testing, and release management.

## Overview of CI/CD Pipeline

The project implements a comprehensive CI/CD pipeline with distinct workflows for:

1. Continuous Integration (CI) workflows that run on each PR and push
2. Security analysis workflows for vulnerability detection
3. Release automation for creating verified, attested releases

## CodeQL Security Analysis Workflow

**Security Focus:** Automatically analyzes code for potential security vulnerabilities and coding errors using GitHub's CodeQL engine.

**Risk Management Focus:** Provides early detection of security issues during development, preventing vulnerabilities from reaching production.

```mermaid
flowchart TD
    A[Push to main/PR] -->|Triggers| B[CodeQL Analysis]
    B --> C{Initialize CodeQL}
    C --> D[Autobuild Project]
    D --> E[Analyze JavaScript/TypeScript]
    E --> F{Security Issues?}
    F -->|Yes| G[Report Security Vulnerabilities]
    F -->|No| H[Clean Analysis]

    classDef trigger fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black;
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black;
    classDef security fill:#ffcdd2,stroke:#333,stroke-width:1px,color:black;
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black;
    classDef good fill:#66cc66,stroke:#333,stroke-width:1px,color:white;
    classDef bad fill:#ff6666,stroke:#333,stroke-width:1px,color:white;

    class A trigger;
    class B,C,D,E process;
    class F decision;
    class G bad;
    class H good;
```

## Release Workflow

**Supply Chain Security Focus:** Implements secure build processes with attestations and provenance to ensure release integrity and verify authenticity.

**Release Management Focus:** Automates the versioning, building, testing, and publishing process for new releases with comprehensive artifacts.

```mermaid
flowchart TD
    A[Tag Push/Manual Trigger] --> B[Prepare Release]
    B --> C[Set Version]
    C --> D{Run Tests}
    D -->|Pass| E[Build Release Package]
    D -->|Fail| D1[Abort Release]
    E --> F[Generate SBOM]
    F --> G[Create Attestations]
    G --> H[Publish GitHub Release]

    classDef trigger fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black;
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black;
    classDef testing fill:#e8f5e9,stroke:#333,stroke-width:1px,color:black;
    classDef security fill:#ffcdd2,stroke:#333,stroke-width:1px,color:black;
    classDef build fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black;
    classDef publish fill:#bbdefb,stroke:#333,stroke-width:1px,color:black;
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black;
    classDef failure fill:#ff6666,stroke:#333,stroke-width:1px,color:white;

    class A trigger;
    class B,C process;
    class D decision;
    class D1 failure;
    class E build;
    class F,G security;
    class H publish;
```

## Detailed Release Process

```mermaid
stateDiagram-v2
    [*] --> Preparation: Version Tag or Manual Trigger

    state Preparation {
        [*] --> Versioning
        Versioning --> TestPrep
        TestPrep --> [*]
    }

    Preparation --> Testing: Start Test Suite

    state Testing {
        [*] --> UnitTests
        UnitTests --> E2ETests
        E2ETests --> [*]
    }

    Testing --> Build: Tests Pass
    Testing --> [*]: Tests Fail

    state Build {
        [*] --> CompileCode
        CompileCode --> CreateArtifacts
        CreateArtifacts --> SecurityAttestation
        SecurityAttestation --> SBOM
        SBOM --> [*]
    }

    Build --> Release

    state Release {
        [*] --> DraftRelease
        DraftRelease --> PublishRelease
        PublishRelease --> [*]
    }

    Release --> [*]

    classDef preparation fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black;
    classDef testing fill:#e8f5e9,stroke:#333,stroke-width:1px,color:black;
    classDef build fill:#d1c4e9,stroke:#333,stroke-width:1px,color:black;
    classDef release fill:#bbdefb,stroke:#333,stroke-width:1px,color:black;
    classDef terminal fill:#f5f5f5,stroke:#333,stroke-width:1px,color:black;

    class Preparation preparation;
    class Testing testing;
    class Build build;
    class Release release;
    class [*] terminal;
```

## Security Scanning Integration

**Security Focus:** Shows how automated security scans are integrated throughout the development lifecycle to identify vulnerabilities early.

**Compliance Focus:** Illustrates the implementation of automated compliance checks and security policy enforcement via CI/CD.

```mermaid
flowchart TD
    A[Code Commit] --> B{PR or Push?}
    B -->|PR| C[Run CodeQL Analysis]
    B -->|Push to main| D[Run Full Security Suite]

    C --> E[Dependency Scanning]
    C --> F[Static Code Analysis]

    D --> E
    D --> F
    D --> G[Secret Detection]
    D --> H[Software Composition Analysis]

    E --> I{Issues Found?}
    F --> I
    G --> I
    H --> I

    I -->|Yes| J[Create Security Issues]
    I -->|No| K[Security Check Passed]

    J --> L[Block Merge If Critical]
    K --> M[Allow Merge/Deploy]

    classDef start fill:#a0c8e0,stroke:#333,stroke-width:1px,color:black;
    classDef process fill:#f9f9f9,stroke:#333,stroke-width:1px,color:black;
    classDef security fill:#ffcdd2,stroke:#333,stroke-width:1px,color:black;
    classDef decision fill:#ffda9e,stroke:#333,stroke-width:1px,color:black;
    classDef pass fill:#66cc66,stroke:#333,stroke-width:1px,color:white;
    classDef fail fill:#ff6666,stroke:#333,stroke-width:1px,color:white;

    class A start;
    class B decision;
    class C,D,E,F,G,H process;
    class I decision;
    class J fail;
    class K pass;
    class L fail;
    class M pass;
```

## Key Workflow Features

### 1. CodeQL Security Scanning

The CodeQL workflow automatically scans for security vulnerabilities in:

- JavaScript and TypeScript code
- React component vulnerabilities
- Potential injection attacks
- Insecure coding patterns

Results are reported through GitHub Security tab with automated alerts for maintainers.

### 2. Comprehensive Testing Integration

The release workflow ensures quality through:

- Vitest unit tests with high coverage requirements
- Cypress end-to-end tests for user flows
- Visual regression tests for UI components
- Test reports and artifacts published for review

### 3. Software Bill of Materials (SBOM)

Every release includes:

- Complete SBOM in SPDX JSON format
- Dependency listing with versions
- License compliance information
- Known vulnerability status

### 4. Release Attestations

The workflow creates cryptographically signed attestations certifying:

- Build provenance (who built it, when, and how)
- SBOM verification for dependency transparency
- Artifact integrity through secure hashing

### 5. Pipeline Security Controls

Security throughout the CI/CD pipeline is maintained by:

- Hardened CI runner environments
- Limited pipeline permissions
- Pinned action versions with SHA hashes
- Dependency caching for build reproducibility
- Audit logging of all CI/CD operations

## Benefits of the CI/CD Approach

1. **Consistent Quality:** Automated testing ensures code quality across all changes
2. **Security Integration:** Security scanning is built into the development process
3. **Release Confidence:** Every release has verified provenance and integrity
4. **Compliance Support:** Automated attestations help meet regulatory requirements
5. **Developer Experience:** Fast feedback on code quality and security issues
