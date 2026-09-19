# ClinicFlow Revenue OS — Architecture Decisions

## ADR-001 — Revenue recovery is the wedge
Decision: start with lost-lead/follow-up recovery rather than full clinic management.
Reason: operational SaaS is already crowded in the observable Iranian market; the differentiator to validate is measurable economic recovery.

## ADR-002 — Deterministic scoring before ML
Decision: calculate opportunity scores from explicit business rules first.
Reason: we lack outcome history to calibrate an ML probability model. False precision would damage trust.

## ADR-003 — Four agents, one orchestrator
Decision: use four specialized agent roles behind application-controlled contracts.
Reason: specialization improves context boundaries; an application orchestrator remains authoritative for permissions, state and business truth.

## ADR-004 — Human approval for customer communication
Decision: recommendations can be generated; outbound sensitive communication requires human approval.
Reason: patient communication is consequential and privacy-sensitive.

## ADR-005 — PostgreSQL production target, demo store only for UI
Decision: keep demo state isolated while building the UX; production pilots require PostgreSQL.
Reason: the existing UI can be iterated quickly without pretending in-memory state is production persistence.

## ADR-006 — Do not claim recovered revenue without attribution
Decision: store baseline, action, outcome and attribution evidence.
Reason: revenue may have multiple causes; correlation is not causation.
