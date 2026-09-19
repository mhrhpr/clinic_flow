# ClinicFlow — OMIND Company OS Delivery Record

## Delivery contract

A change is NOT DONE because code was written, committed, or deployed.

A change is HANDOFF-READY only when every gate below is green on the exact commit being handed off:

1. Source gate — intended changes exist on the exact branch/PR head.
2. Static gate — web typecheck + lint pass; patient service typecheck + tests + build pass.
3. Schema gate — Prisma generate succeeds.
4. Production build gate — Next production build succeeds.
5. Runtime gate — production server starts and dashboard + critical preview APIs respond.
6. Browser gate — core flows are exercised in a real browser when browser automation is available: dashboard load, navigation, search, create patient, change appointment status, responsive layout, console errors.
7. Deployment gate — Vercel deployment for the exact commit succeeds.
8. Handoff gate — only then may the assistant say DONE.

If any gate fails, the state is IN PROGRESS or BLOCKED. Report the failing gate; do not report completion.

## Automatically enforced gates

The CI workflow enforces static, schema, production-build and runtime-smoke gates.

## Core product slice

- Landing page
- Dashboard
- Patient 360 / search / creation
- Appointment queue / status transition
- Treatments surface
- Billing surface
- Clinic context foundation

## Verification boundary

Preview/demo patient and appointment data are isolated until authenticated production persistence is connected. This is not yet a production healthcare system.

## Next production gates

- Identity/session + RBAC
- PostgreSQL service-owned persistence
- Scheduling conflict/timezone policies
- Patient access controls + audit trail
- Integration/E2E coverage
- Observability
- Deployment environment and secrets
