# ClinicFlow Revenue OS — Data Model

## Transactional entities

Organization
→ Clinic
→ ClinicMembership / User

Clinic
→ Lead
→ Patient
→ Interaction
→ Consultation
→ Appointment
→ Treatment
→ Payment / Invoice
→ FollowUp
→ Campaign

## Derived layer

RevenueOpportunity is derived from transactional events and analytics. It should not become an alternative source of truth for money.

## Lead lifecycle

```
NEW
 ↓
CONTACTED
 ↓
QUALIFIED
 ↓
CONSULTATION
 ↓
APPOINTMENT
 ↓
TREATMENT
 ↓
PAYMENT
 ↓
FOLLOW_UP
 ↓
REPEAT
```

A stage transition must be represented by a timestamped event when the business needs reliable funnel analysis.

## Required design rules
- UUIDs as primary identifiers.
- clinicId on tenant-owned records.
- createdAt / updatedAt on mutable entities.
- explicit status enums where lifecycle semantics matter.
- money stored as Decimal, never floating point.
- derived metrics computed from source records.
- sensitive notes minimized in AI context.
- immutable audit/event history for consequential actions.

## MVP entities
The current schema already contains Organization, Clinic, User, ClinicMembership, Patient, Appointment, Service, Treatment, Invoice, InvoiceItem, Payment, Expense, ClinicSetting, ClinicFeature, WorkflowDefinition, CustomFieldDefinition/Value and AuditLog.

The Revenue OS extension adds:
- Lead
- Interaction
- Consultation
- FollowUp
- Campaign

Appointments, treatments and payments remain the source of truth for their respective domains.
