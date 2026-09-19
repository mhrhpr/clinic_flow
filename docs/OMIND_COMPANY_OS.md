# OMIND Company OS — Delivery Contract

## Purpose

ClinicFlow changes are delivered through a proof-based handoff protocol. Writing code, committing code, or receiving a deployment URL is not completion.

**A change is HANDOFF-READY only when every required gate is green on the exact commit being handed off.**

## Required delivery gates

1. **Source gate**
   - The intended change exists on the exact branch/PR head.
   - CI checks out and asserts that exact commit for pull requests.

2. **Static gate**
   - Web TypeScript typecheck passes.
   - Web lint passes.
   - Patient service typecheck passes.
   - Patient service tests pass.
   - Patient service build passes.

3. **Schema gate**
   - Prisma generate passes on the exact commit.

4. **Production build gate**
   - npm run build passes.

5. **Runtime gate**
   - The production server starts.
   - /dashboard returns non-empty HTML containing ClinicFlow.
   - /api/demo/patients returns the expected data envelope.
   - /api/demo/appointments returns the expected data envelope.

6. **Browser gate**
   - Playwright exercises the production build.
   - Dashboard loads.
   - Navigation to Patients works.
   - Patient creation works.
   - Patient search works.
   - Navigation to Appointments works.
   - Appointment status mutation works.
   - Browser console has no error messages during the critical flow.
   - Screenshots, video and traces are retained on failure.

7. **Deployment gate**
   - Vercel reports success for the exact PR head commit.
   - CI waits for the Vercel status instead of treating a deployment URL as proof of success.

8. **Handoff gate**
   - No known blocking failure remains.
   - Only after gates 1–7 pass may the status be reported as **DONE**.

## Failure protocol

If any gate fails, status is **IN PROGRESS** or **BLOCKED**. The failing gate and concrete error must be identified and fixed before handoff.

Never report completion based only on:
- code inspection,
- a successful commit,
- a generated preview URL,
- or a partial CI result.

## Delivery loop

Architecture → Implement → Exact-head CI → Static/Schema → Build → Runtime → Browser → Vercel → Handoff

The goal is one complete verification cycle, not repeated user-side debugging.

## Current boundary

The current patient and appointment interactions are deliberately demo-backed through server-side in-memory state. They are not yet the authenticated service-of-record implementation described in docs/ARCHITECTURE.md. That boundary must remain explicit until the owning services are connected.
