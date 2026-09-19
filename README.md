# ClinicFlow Revenue OS

AI-powered Revenue Intelligence and Operations for Iranian beauty and aesthetic clinics.

## Product
ClinicFlow is being built around one economic question:

> Where is the clinic losing revenue, why, what should the team do next, and did that action recover value?

Initial wedge: **lost-lead / follow-up recovery**.

## Current status
- Market/competitive discovery documented.
- Revenue OS product definition documented.
- Production-oriented Prisma domain model extended for leads, interactions, consultations, follow-ups and campaigns.
- Persian Revenue OS landing page implemented.
- Existing demo patient/appointment flows remain available for UI verification.
- Real customer validation is still required before claiming product-market fit or recovered revenue.

## Four-agent architecture
1. Revenue Analyst
2. Follow-Up Strategist
3. Operations Analyst
4. Management Briefing

An application-level orchestrator remains authoritative for data, permissions, scoring, actions and measurement.

## Documentation
- [PRODUCT.md](./PRODUCT.md)
- [MARKET_RESEARCH.md](./MARKET_RESEARCH.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DATA_MODEL.md](./DATA_MODEL.md)
- [API.md](./API.md)
- [SECURITY.md](./SECURITY.md)
- [ROADMAP.md](./ROADMAP.md)
- [DECISIONS.md](./DECISIONS.md)

## Reality boundary
The current UI demo uses in-memory state for selected interactions. It is not production persistence and must not be used with real patient data. Production pilots require authenticated PostgreSQL persistence, tenant isolation, RBAC, auditability and validated workflows.

## Validation gate
Before significant automation:
- 10 operator interviews
- 3 real workflow reconstructions
- 1 strong paid-pilot / willingness-to-pay signal
- baseline revenue-leakage measurement

The product should earn the right to become more complex through evidence.
