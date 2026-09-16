# ClinicFlow Reference Standards & Open-Source Research

This document records public references used to shape ClinicFlow. References are used for architectural and UX patterns, not as source-code templates.

## 1. Clinic / Healthcare Product References

### abinauv/dental-erp
- Next.js App Router + TypeScript
- Prisma-backed relational persistence
- Multi-tenant hospital/clinic context
- Patients, appointments, treatments, billing, payments, documents, audit logs
- Localization and deployment documentation
- Unit, integration, component and E2E testing

ClinicFlow adopts the separation of operational modules, tenant-scoped data, auditability, testing layers, and integration boundaries. ClinicFlow deliberately uses a cleaner domain/application/persistence separation.

### MyLikita-Health/sudoEMR
- Open-source EMR-oriented platform
- Patient records and appointments
- Doctor/nurse workflows
- Laboratory, pharmacy, accounting and remote-care modules

ClinicFlow uses this as a reference for expanding the core from simple billing into a patient-centered operational platform, while avoiding premature hospital-scale clinical scope.

### uniqueabhishek/MedFlow-HMS
- Next.js application
- Prisma persistence
- Vitest and Playwright testing

ClinicFlow adopts the principle that testing is part of the product architecture rather than an afterthought.

### abdulrehmankz1/clinic-management
- Multi-tenant clinic management
- Strict tenant isolation
- Staff and roles
- Patients and appointments
- Walk-ins and dashboard flows
- Later-stage billing/payments, patient timeline, SaaS plans, reminders and audit log

ClinicFlow uses strict tenant isolation and a patient timeline as core concepts, while implementing them through its own domain/application boundaries.

## 2. SaaS / Multi-Tenant / Personalization References

### sudharsangs/nextjs-multitenant-saas-boilerplate
- Tenant isolation
- RBAC
- Subscription management
- Audit logging
- PostgreSQL
- Type-safe TypeScript architecture

ClinicFlow adopts the tenant-context and permission concepts, but personalization is broader: configuration, policies, workflows, feature/module settings, custom fields and branding.

### IrigoyenCodes/dashboard-starter
- Next.js 16 App Router
- shadcn/ui + Tailwind CSS
- Feature-based structure
- Charts, tables and forms
- Multi-tenant workspaces
- RBAC-aware navigation
- Theme support

ClinicFlow uses the feature-oriented UI organization and config-driven dashboard concepts.

## 3. Dashboard / UI / UX References

### shadcndashboard/next-shadcn-dashboard
Useful references for:
- Responsive dashboard shell
- Authentication screens
- Data tables
- Forms and validation
- User profile/settings
- Charts
- Dark mode

### sjorsbogers/Dashboard-Design
Useful implementation patterns for:
- Real data tables with filtering/sorting/pagination
- Server prefetch + client cache
- URL-synchronized search/filter state
- Reusable forms with validation and mutations
- Feature-based API organization
- Minimal production-oriented dashboard architecture

### masondevx/orbynadmin
Useful visual references for:
- Healthcare and logistics dashboard patterns
- Theme customization
- Workspace switcher
- Nested navigation
- Analytics/reporting layouts
- Responsive admin UX

### NextAdminHQ/nextjs-admin-dashboard
Useful references for:
- Large reusable UI component systems
- Tables, forms, charts, settings and calendar views
- Figma-backed design workflow
- Mock APIs shaped like real APIs

These are references for information architecture and UI patterns. ClinicFlow will not copy a template wholesale.

## 4. Accessibility / International UX Standards

### W3C WCAG 2.2
ClinicFlow targets WCAG 2.2 as the accessibility reference standard, with practical AA-oriented implementation and testing.

Relevant principles:
- Perceivable
- Operable
- Understandable
- Robust

Accessibility applies to desktop, tablet and mobile workflows and must be validated with automated tools plus human review.

### U.S. Web Design System (USWDS)
USWDS is used as a secondary UX/design-system reference for:
- Design tokens
- Responsive components
- Accessible interaction patterns
- Forms, validation and error states
- Consistent visual language

ClinicFlow does not adopt Section 508 as its product-specific legal requirement; USWDS is used as a practical design-system reference.

### CMS Design System
The CMS Design System is a healthcare-adjacent accessibility and component reference. Its open-source React/CSS components and accessibility guidance are useful for form, content, and service UX patterns.

## 5. ClinicFlow Design-System Rules

1. Accessibility is a product requirement, not a visual enhancement.
2. UI components must be reusable and themeable through design tokens.
3. Clinic branding changes tokens and configuration, not component source code.
4. RTL and LTR are both first-class layout modes.
5. Localization includes locale, currency, timezone, number formatting and date formatting.
6. Forms must expose clear labels, validation, errors, loading, success and recovery states.
7. Tables must support search, filter, sort, pagination and useful empty/loading/error states.
8. Dashboards are configurable by role and clinic context; they are not one universal screen.
9. Color must not be the sole carrier of meaning.
10. Sensitive patient data must never be exposed through client-side configuration or logs accidentally.

## 6. Implementation Direction

ClinicFlow target stack:

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui / accessible primitives
- TanStack Table
- TanStack Query where client cache/server hydration is useful
- React Hook Form + Zod for complex forms
- PostgreSQL
- Prisma
- Auth layer with organization/clinic context and RBAC
- Object storage abstraction for documents
- Integration adapters for email/SMS/payment/calendar services
- Vitest for unit/integration-level tests
- Playwright for critical E2E workflows

The exact dependency versions will be pinned when the runnable application scaffold is created and verified.
