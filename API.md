# ClinicFlow Revenue OS — API Contract

## Principles
- JSON
- explicit validation
- clinic-scoped authorization
- no LLM-generated source-of-truth mutations
- idempotency for external/event ingestion where applicable
- audit consequential writes

## Revenue OS endpoints

### Leads
GET /api/leads
POST /api/leads
PATCH /api/leads/:id

### Interactions
POST /api/leads/:id/interactions

### Follow-ups
GET /api/follow-ups?status=overdue
POST /api/follow-ups
PATCH /api/follow-ups/:id

### Opportunities
GET /api/revenue/opportunities
GET /api/revenue/opportunities/:id

### Actions
POST /api/revenue/opportunities/:id/actions
POST /api/revenue/actions/:id/approve
POST /api/revenue/actions/:id/outcome

### Management
GET /api/revenue/summary
GET /api/revenue/briefing

These are the target contracts. The demo APIs currently implemented in the repository remain under /api/demo and are not production contracts.
