# ClinicFlow Delivery Roadmap

This roadmap is the execution contract for the first production architecture.

## Phase 01 — Foundation
**Goal:** make the repository a safe multi-service TypeScript workspace.

Deliverables:
- Explicit workspace boundaries.
- Versioned cross-service transport contracts.
- Architectural and security rules documented.
- CI validates web, contracts, and service boundaries.

Status: **CI verification pending**.

## Phase 02 — Identity + Clinic Context
**Goal:** establish authenticated identity, organization/clinic membership, roles, and request context.

Deliverables:
- identity-service boundary with active-membership authorization use case
- clinic-service boundary with data-driven clinic configuration
- authenticated clinic context propagation
- RBAC policy boundary

Status: **foundation implemented; production authentication adapter pending**.

Open inputs: authentication provider, production domain, initial clinic/organization seed data.

## Phase 03 — Patient 360
**Goal:** replace the in-memory patient adapter with service-owned PostgreSQL persistence and complete the patient lifecycle.

Deliverables:
- patient-service database contract and migrations
- Patient 360 read model
- search/filter/pagination
- custom fields boundary
- audit events

Status: planned.

Open inputs: retention policy, required Iranian identifiers/fields, document storage provider.

## Phase 04 — Scheduling
**Goal:** appointments, availability, rescheduling, cancellation, and reminders.

Deliverables:
- scheduling-service
- timezone-safe scheduling model
- conflict detection
- reminder integration contract

Status: planned.

Open inputs: clinic working-hour rules and appointment categories.

## Phase 05 — Treatment
**Goal:** treatment/procedure lifecycle and treatment plans.

Deliverables:
- treatment-service
- procedure catalog
- treatment state machine
- links to patient and appointment by identifiers/events

Status: planned.

Open inputs: medical specialty templates and terminology.

## Phase 06 — Billing
**Goal:** configurable invoicing without hardcoded clinic economics.

Deliverables:
- billing-service
- invoice/invoice-item model
- configurable billing policies
- numbering and localized rendering

Status: planned.

Open inputs: tax/VAT requirements by country, invoice templates, clinic pricing policies.

## Phase 07 — Finance + Notifications
**Goal:** payments, expenses, balances, and reliable communication.

Deliverables:
- finance-service
- notification-service
- idempotent payment/notification commands
- provider adapters

Status: planned.

Open inputs: payment gateway(s), SMS provider, email provider.

## Phase 08 — Web/BFF + Clinical UX
**Goal:** connect the real services to a production-grade Next.js application.

Deliverables:
- apps/web migration
- route-level authorization
- Patient 360 UI
- appointment and billing flows
- responsive keyboard-accessible interface

Accessibility target: WCAG 2.2 AA as an engineering target.

Status: planned.

## Phase 09 — Personalization + Analytics
**Goal:** make clinic differences data-driven and reporting operationally useful.

Deliverables:
- clinic settings/features/policies/workflows
- custom-field configuration UI
- role-aware dashboard composition
- analytics-service read models

Status: planned.

Open inputs: KPI definitions and clinic personas.

## Phase 10 — Production Readiness
**Goal:** verify the platform as a deployable product, not merely a working demo.

Deliverables:
- security review
- audit logging verification
- integration/E2E tests
- observability
- backups/restore runbook
- deployment configuration
- performance budget and smoke tests

Status: planned.

Definition of done for the roadmap:
1. Domain rules are isolated from transport/framework code.
2. Each service owns its persistence boundary.
3. Cross-service dependencies use explicit contracts.
4. Tenant/clinic context is enforced server-side.
5. Sensitive patient data is excluded from logs and telemetry.
6. Every production-critical workflow has automated tests.
7. No unresolved architecture shortcut is hidden inside application code.
