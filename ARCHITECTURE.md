# ClinicFlow Revenue OS — Architecture

## Architecture principle
Keep operational truth, derived analytics and AI conclusions separate.

```
Clinic UI
   ↓
Next.js / TypeScript
   ↓
API boundary
   ↓
Application services
   ↓
PostgreSQL + Prisma
   ├── operational records
   └── immutable/auditable events
   ↓
Revenue Opportunity Engine
   ↓
structured AI context
   ↓
AI services / agents
   ↓
recommendation + human approval
   ↓
action outcome
   ↓
revenue measurement
```

## Four-agent operating model

### Agent 1 — Revenue Analyst
Input: structured clinic metrics and events.
Output: leakage candidates, evidence, trends, deterministic opportunity explanations.
Permission: read analytics context only.

### Agent 2 — Follow-Up Strategist
Input: prioritized opportunities and interaction history.
Output: recommended timing, channel and draft action.
Permission: no direct outbound communication in MVP.

### Agent 3 — Operations Analyst
Input: appointments, staff workflow and follow-up execution.
Output: bottlenecks, no-show patterns, workload issues.
Permission: read operational/analytics context only.

### Agent 4 — Management Briefing
Input: validated metrics and approved insights.
Output: owner-level daily/weekly brief.
Permission: read-only; no source-of-truth writes.

### Orchestrator / product brain
The application layer, not an LLM, decides:
- which data is authoritative
- which opportunity qualifies
- score calculation
- permissions
- approval requirements
- action state
- measurement
- audit record

Agents are workers behind explicit contracts. They are not independent authorities.

## Opportunity engine v1

Conceptual score:
`estimatedValue × conversionProbability × urgency × recoverability`

MVP implementation:
- deterministic rules
- bounded values
- explicit evidence
- confidence based on data completeness, not invented model certainty

Later, historical outcomes can calibrate conversion probability.

## Data flow

Operational DB → query/aggregation → normalized context object → optional LLM → schema validation → application decision → audit event.

The LLM never writes revenue, payment, patient or appointment truth directly.

## Deployment
Initial web stack:
- Next.js
- TypeScript
- PostgreSQL
- Prisma
- REST API
- background jobs when real workflows require them
- Docker for reproducible services
- Vercel for web delivery where compatible

Python/FastAPI is introduced only when analytics/AI workloads materially benefit from it.

## Multi-tenancy
Every tenant-owned record carries clinic scope directly or through a strictly scoped parent. Authorization must verify clinic membership before reads/writes.

## Current implementation boundary
The present demo uses in-memory state for UI workflows. It is not production persistence. The Prisma schema is the production target and should be connected before a real clinic pilot with sensitive data.
