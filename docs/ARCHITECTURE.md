# ClinicFlow Architecture

## Architectural Decisions

ClinicFlow is designed as a multi-tenant, multi-branch clinic operations platform.

### Core decisions

1. **Multi-tenancy is first-class.** Every tenant-scoped record belongs to an Organization/Clinic context.
2. **Multi-branch is supported.** An Organization can contain multiple Clinics/Branches.
3. **Clinic personalization is first-class.** Clinic-specific behavior is represented through configuration, policies, feature/module settings, custom fields, and workflows rather than branching the core codebase.
4. **Core domain remains stable.** Patients, Appointments, Treatments, Billing, Payments, Expenses, Staff, Documents, and Audit remain reusable platform capabilities.
5. **Personalization must not leak into core business logic as clinic-specific conditionals.** Application services resolve clinic context and policies before invoking domain rules.
6. **Next.js App Router is the application shell.** UI concerns live in `app`, `features`, and shared components.
7. **Business logic is separated from React.** Application use cases orchestrate workflows; domain modules contain business rules.
8. **Persistence is abstracted.** Repository interfaces are defined independently from Prisma so storage adapters can evolve.
9. **PostgreSQL is the target production database.** Prisma is the ORM/data-mapping layer.
10. **External services are adapters.** Email, SMS, object storage, payment providers, calendars, and AI integrations sit behind integration/service boundaries.
11. **Analytics and AI consume application/domain data without becoming the system of record.**

## Personalization Model

Clinic customization has four levels:

- **Configuration:** locale, timezone, currency, invoice numbering, working hours, enabled modules, payment methods, branding.
- **Policies:** approval rules, payment/deposit rules, cancellation/refund rules, edit permissions, commission rules, billing policies.
- **Workflows:** configurable operational sequences such as Lead → Consultation → Treatment → Invoice → Payment → Follow-up.
- **Custom Fields:** clinic-defined patient, appointment, treatment, or operational metadata where the core model is insufficient.

## Runtime Flow

`UI → Application Use Case → Clinic Context → Policy/Configuration → Domain Rule → Repository → Database`

A clinic-specific rule should be represented as configuration/policy/workflow data whenever practical, not as scattered `if (clinicId === ...)` logic.

## Domain Boundaries

- `patients`: Patient 360 and identity/contact/medical metadata.
- `appointments`: scheduling, availability, status, reminders.
- `treatments`: procedures, treatment plans, clinical/operational progression.
- `billing`: invoices, line items, billing rules.
- `finance`: payments, expenses, balances, financial policies.
- `organization`: organization, clinics/branches, tenant context.
- `staff`: users, roles, staff profiles, permissions.
- `audit`: immutable audit trail.
- `personalization`: configuration, policies, feature flags, workflows, custom fields.

## External Reference Research

The architecture is informed by patterns observed in public clinic/EMR repositories, especially:

- `abinauv/dental-erp`: Next.js App Router, Prisma, multi-tenant hospital/clinic context, role-based access, billing/payments, documents, audit logs, testing, CI/CD, localization, and application API routes.
- `MyLikita-Health/sudoEMR`: broader EMR module separation across records, doctors, pharmacy, laboratory, accounting, appointments and patient workflows.
- `uniqueabhishek/MedFlow-HMS`: Next.js + Prisma and dedicated unit/integration/E2E testing structure.

These projects are references only. ClinicFlow does not copy their code or schema. Their useful architectural patterns are adapted to ClinicFlow's more deliberate separation of domain, application, persistence, and clinic personalization.
