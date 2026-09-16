# ClinicFlow Architecture

## Architectural Decisions

ClinicFlow is designed as a multi-tenant, multi-branch clinic operations platform.

### Core decisions

1. **Multi-tenancy is first-class.** Every tenant-scoped record belongs to an Organization/Clinic context.
2. **Multi-branch is supported.** An Organization can contain multiple Clinics/Branches.
3. **Clinic personalization is first-class.** Clinic-specific behavior is represented through configuration, policies, feature/module settings, custom fields, branding, and workflows rather than branching the core codebase.
4. **Core domain remains stable.** Patients, Appointments, Treatments, Billing, Payments, Expenses, Staff, Documents, and Audit remain reusable platform capabilities.
5. **Personalization must not leak into core business logic as clinic-specific conditionals.** Application services resolve clinic context and policies before invoking domain rules.
6. **Next.js App Router is the application shell.** UI concerns live in `app`, `features`, and shared components.
7. **Business logic is separated from React.** Application use cases orchestrate workflows; domain modules contain business rules.
8. **Persistence is abstracted.** Repository interfaces are defined independently from Prisma so storage adapters can evolve.
9. **PostgreSQL is the target production database.** Prisma is the ORM/data-mapping layer.
10. **External services are adapters.** Email, SMS, object storage, payment providers, calendars, and AI integrations sit behind integration/service boundaries.
11. **Analytics and AI consume application/domain data without becoming the system of record.**
12. **UX follows international accessibility and responsive-design practice.** WCAG 2.2 is the accessibility reference; accessible component systems and design tokens are preferred.
13. **UI personalization is token/config driven.** Clinic branding, navigation, enabled modules, dashboards and visual preferences are resolved from clinic context and design tokens instead of duplicated component implementations.
14. **RTL and LTR are first-class.** Localization is a system concern and must not be hard-coded into individual pages.

## Personalization Model

Clinic customization has six levels:

- **Configuration:** locale, timezone, currency, invoice numbering, working hours, enabled modules, payment methods, branding.
- **Policies:** approval rules, payment/deposit rules, cancellation/refund rules, edit permissions, commission rules, billing policies.
- **Workflows:** configurable operational sequences such as Lead → Consultation → Treatment → Invoice → Payment → Follow-up.
- **Custom Fields:** clinic-defined patient, appointment, treatment, or operational metadata where the core model is insufficient.
- **Dashboard Configuration:** role-aware widgets, KPIs, tables, alerts and quick actions selected for a clinic's operating model.
- **UI Theme Tokens:** logo, typography choices, radius, density, accent palette and other non-structural branding settings.

### Personalization rule

Prefer data/configuration-driven variation when the difference is a business preference. Introduce a new domain capability when the variation represents a fundamentally different business concept.

Examples:

- Different invoice prefix → configuration.
- Deposit required before treatment → policy.
- Consultation → treatment → follow-up → workflow.
- Custom patient field → custom field metadata.
- Reception dashboard vs doctor dashboard → dashboard configuration + role permissions.
- Dental charting vs generic treatment note → separate domain capability, not a boolean maze.

## Runtime Flow

`UI → Application Use Case → Clinic Context → Policy/Configuration → Domain Rule → Repository → Database`

For UI:

`Clinic Context → UI Configuration → Design Tokens / Navigation / Dashboard Composition → Components`

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
- `personalization`: configuration, policies, feature flags, workflows, custom fields, dashboard composition and theme settings.

## External Reference Research

The architecture is informed by patterns observed in public clinic/EMR and SaaS repositories:

- `abinauv/dental-erp`: Next.js App Router, Prisma, tenant-scoped hospital/clinic context, role-based access, billing/payments, documents, audit logs, testing, CI/CD and localization.
- `MyLikita-Health/sudoEMR`: broader EMR module separation across records, doctors, pharmacy, laboratory, accounting, appointments and patient workflows.
- `uniqueabhishek/MedFlow-HMS`: Next.js + Prisma and dedicated unit/integration/E2E testing structure.
- `abdulrehmankz1/clinic-management`: explicit multi-tenant isolation, staff/roles, appointments, dashboard flows, patient timeline, billing/payments, SaaS plans and audit logging.
- `sudharsangs/nextjs-multitenant-saas-boilerplate`: tenant isolation, RBAC, subscriptions and audit logging for B2B SaaS.
- `IrigoyenCodes/dashboard-starter`, `sjorsbogers/Dashboard-Design`, `shadcndashboard/next-shadcn-dashboard`, `masondevx/orbynadmin`, and `NextAdminHQ/nextjs-admin-dashboard`: feature-oriented dashboard composition, tables/forms/charts, role-aware navigation, themes, responsive layouts and configurable admin UX.

## Standards & UX References

- **W3C WCAG 2.2:** accessibility reference standard for the application UI.
- **U.S. Web Design System (USWDS):** secondary reference for design tokens, accessible components, responsive patterns and form UX.
- **CMS Design System:** healthcare-oriented reference for accessible and responsive service interfaces.

See `docs/REFERENCE_STANDARDS.md` for the research notes and implementation implications.

## Target Product Architecture

ClinicFlow is a **modular monolith**, not a microservice system at this stage. Modules communicate through application/domain boundaries and repository/integration ports. This keeps deployment and development simple while preserving clear boundaries for future extraction if scale demands it.

Core platform capabilities are shared across clinics. Clinic-specific differences are supplied through clinic context, configuration, policies, workflows, dashboard composition and theme tokens.

## Non-Goals

- Do not copy public repositories wholesale.
- Do not fork the application for different clinic business models.
- Do not put business rules inside React components or UI hooks.
- Do not make Google Sheets the production system of record.
- Do not introduce microservices merely for theoretical scalability.
