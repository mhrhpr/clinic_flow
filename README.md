# ClinicFlow

ClinicFlow is a multi-tenant, multi-branch clinic operations platform being built as a production-oriented TypeScript system.

## Architecture

- **Web:** Next.js App Router / BFF
- **Services:** Fastify microservices aligned to bounded contexts
- **Data:** service-owned persistence boundaries
- **Contracts:** versioned HTTP/event schemas in `@clinicflow/contracts`
- **Validation:** Zod at application boundaries plus domain invariants
- **UI:** responsive, localization-aware, RTL/LTR capable, with WCAG 2.2 AA as the engineering target

## Service boundaries

| Service | Responsibility |
|---|---|
| identity-service | users, sessions, memberships, roles |
| clinic-service | organization, clinics, configuration |
| patient-service | Patient 360 |
| scheduling-service | appointments and availability |
| treatment-service | treatments and treatment plans |
| billing-service | invoices and billing policies |
| finance-service | payments, expenses, balances |
| notification-service | messages and delivery |
| analytics-service | reporting and read models |

## Current implementation

The repository is migrating from the original Next.js foundation toward explicit service boundaries. The patient service currently contains a domain/application/HTTP slice with an in-memory adapter. The clinic service now exposes the first data-driven clinic configuration slice.

See:

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/ROADMAP.md`](docs/ROADMAP.md)
- [`docs/SECURITY.md`](docs/SECURITY.md)
- [`docs/REFERENCE_STANDARDS.md`](docs/REFERENCE_STANDARDS.md)

## Development rule

Do not solve clinic-specific behavior with scattered `clinicId` conditionals. Use configuration, policy, workflow, custom-field, or capability boundaries according to the domain requirement.

Do not add new business models to the transitional root Prisma schema. New operational data must be owned by its service.
