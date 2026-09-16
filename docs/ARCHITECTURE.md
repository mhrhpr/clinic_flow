# ClinicFlow Architecture

## Architectural Decisions

ClinicFlow is a multi-tenant, multi-branch clinic platform with configurable clinic-specific behavior.

### Core decisions

1. **Multi-tenancy is first-class.** Every tenant-scoped operation resolves an Organization/Clinic context.
2. **Multi-branch is supported.** An Organization may contain multiple clinics/branches.
3. **Clinic personalization is first-class.** Configuration, policies, workflows, dashboard composition, theme tokens, and custom fields are data-driven.
4. **Bounded contexts are explicit.** Patients, Scheduling, Treatments, Billing, Identity, Personalization, Notifications, and Analytics are separate service boundaries.
5. **Microservice boundaries are domain boundaries.** A service owns its application logic, persistence model, API contract, and operational concerns.
6. **The web application is not the system of record.** Next.js is the user-facing application/BFF layer.
7. **Backend services are independent.** Backend microservices are implemented with Fastify and communicate through explicit HTTP/event contracts.
8. **Persistence is owned by the service.** Each service owns its schema and repository implementation. Cross-service database joins are forbidden.
9. **Domain rules are framework-independent.** Business logic must not depend directly on Fastify, Next.js, Prisma, or transport objects.
10. **Application use cases orchestrate domain behavior.** Routes validate transport input and delegate to application use cases.
11. **External dependencies are adapters.** Storage, messaging, email, SMS, payments, calendars, and AI providers sit behind integration boundaries.
12. **Analytics/AI are consumers of business data.** They do not become authoritative owners of operational records.
13. **UX is configuration-driven and accessible.** WCAG 2.2 is the accessibility reference; RTL/LTR and localization are platform concerns.

## Target Repository Shape

```text
clinic_flow/
├── apps/
│   └── web/                         # Next.js App Router / BFF
├── services/
│   ├── identity-service/            # auth, sessions, memberships, RBAC
│   ├── clinic-service/              # organization, clinics, configuration
│   ├── patient-service/             # Patient 360
│   ├── scheduling-service/          # appointments, availability, reminders
│   ├── treatment-service/           # treatments and treatment plans
│   ├── billing-service/             # invoices and billing policies
│   ├── finance-service/             # payments, expenses, balances
│   ├── notification-service/        # email/SMS/push
│   └── analytics-service/           # reporting/read models
├── packages/
│   ├── contracts/                   # versioned cross-service API/event contracts
│   ├── observability/               # logging/tracing helpers
│   └── test-utils/                  # shared test utilities
└── docs/
```

The current repository still contains the initial `src/` foundation. It is treated as a migration surface while backend services are extracted into the explicit service boundaries above. New business logic should be added to the owning service, not to the legacy global `src/domain` tree.

## Service Internal Architecture

Every backend service follows the same internal structure:

```text
service/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── policies/
│   │   └── repositories/            # interfaces only
│   ├── application/
│   │   ├── commands/
│   │   ├── queries/
│   │   └── services/
│   ├── infrastructure/
│   │   ├── persistence/
│   │   ├── messaging/
│   │   └── integrations/
│   └── http/
│       ├── routes/
│       ├── schemas/
│       └── presenters/
├── prisma/
├── tests/
└── package.json
```

## Request Flow

```text
Browser
   ↓
Next.js BFF / Web
   ↓
Service API
   ↓
HTTP Schema Validation
   ↓
Application Use Case
   ↓
Clinic/Tenant Context
   ↓
Domain Policy + Entity
   ↓
Repository Port
   ↓
Service-Owned Database
```

## Personalization Model

Clinic customization has six levels:

- **Configuration:** locale, timezone, currency, invoice numbering, working hours, enabled modules, payment methods, branding.
- **Policies:** approval rules, deposit rules, cancellation/refund rules, permissions, commission rules, billing policies.
- **Workflows:** configurable operational sequences.
- **Custom Fields:** generic metadata definitions and values for supported entities.
- **Dashboard Configuration:** role-aware widgets, KPIs, tables, alerts and quick actions.
- **UI Theme Tokens:** logo, accent palette, density, radius and typography preferences.

Prefer configuration/policy/workflow data when a clinic difference is a business preference. Introduce a domain capability when the variation represents a fundamentally different concept.

## Service Ownership Rules

| Domain | Owning service | Primary records |
|---|---|---|
| Identity | identity-service | User, Session, Membership, Role |
| Organization | clinic-service | Organization, Clinic, ClinicSetting, ClinicFeature |
| Patients | patient-service | Patient, MedicalProfile, PatientCustomValue |
| Scheduling | scheduling-service | Appointment, Availability, Reminder |
| Treatments | treatment-service | Treatment, TreatmentPlan, Procedure |
| Billing | billing-service | Invoice, InvoiceItem, BillingPolicy |
| Finance | finance-service | Payment, Expense, Balance |
| Notifications | notification-service | Message, Template, DeliveryLog |
| Analytics | analytics-service | Read models, aggregates, reporting datasets |

A service may reference another service's identifiers, but never another service's database directly.

## Integration Rules

- Synchronous operations use versioned HTTP APIs.
- Asynchronous cross-service side effects use domain/integration events where appropriate.
- Shared types are limited to transport contracts; business entities are not shared across service boundaries.
- Every request entering a tenant-scoped service must carry authenticated identity and clinic context.
- Sensitive patient data must not be logged.
- Idempotency is required for externally retried commands such as payments and notifications.

## Current Implementation Progress

### Patient Service

The first production-oriented service boundary is implemented under `services/patient-service`.

Current layers:

- Domain entity and factory
- Repository interface
- Create Patient application use case
- In-memory repository adapter for the initial slice
- Fastify HTTP transport
- Zod request validation
- Clinic context enforcement through `x-clinic-id`
- Centralized error handling

The in-memory adapter is intentionally temporary. PostgreSQL persistence will be added behind the same repository interface without changing the domain or application layers.

## Non-Goals

- Do not share databases across services.
- Do not put business logic in Next.js pages/components.
- Do not copy public repositories wholesale.
- Do not solve clinic-specific differences using `if (clinicId === ...)` branches scattered through the codebase.
- Do not introduce distributed transactions when an event-driven workflow or explicit orchestration is sufficient.
