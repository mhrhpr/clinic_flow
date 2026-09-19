# ClinicFlow Revenue OS — Security

## Threat model
Patient identity, contact details, treatment information, payments and operational notes are sensitive.

## Required controls
- authentication before production access
- clinic-scoped authorization
- RBAC
- secure session handling
- input/schema validation
- encrypted transport
- encrypted sensitive storage where appropriate
- secrets only through environment/secret management
- structured audit logs
- no patient data in ordinary application logs
- minimal AI context
- provider-level data processing review before sending sensitive data to an LLM
- rate limiting for public endpoints
- backup and recovery procedures

## AI boundary
AI receives only the minimum structured context needed for the task. Prefer IDs, categories, dates and aggregates over free-form clinical notes.

No autonomous patient communication in MVP.

## Regulatory posture
Iran's electronic-health roadmap emphasizes confidentiality, secure authentication, role-based access, auditability, secure data exchange/storage and controlled access to health data. ClinicFlow should therefore treat privacy/security as a product requirement.

This document is engineering guidance, not legal advice.
