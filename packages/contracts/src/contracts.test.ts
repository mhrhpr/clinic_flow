import { describe, expect, it } from "vitest";
import { clinicContextSchema, patientCreatedEventSchema } from "./index.js";

describe("clinic context contract", () => {
  it("accepts a complete tenant context", () => {
    const result = clinicContextSchema.safeParse({
      organizationId: "11111111-1111-4111-8111-111111111111",
      clinicId: "22222222-2222-4222-8222-222222222222",
      userId: "33333333-3333-4333-8333-333333333333",
      role: "DOCTOR",
      correlationId: "44444444-4444-4444-8444-444444444444",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an unknown role", () => {
    const result = clinicContextSchema.safeParse({
      organizationId: "11111111-1111-4111-8111-111111111111",
      clinicId: "22222222-2222-4222-8222-222222222222",
      userId: "33333333-3333-4333-8333-333333333333",
      role: "SUPERUSER",
      correlationId: "44444444-4444-4444-8444-444444444444",
    });

    expect(result.success).toBe(false);
  });
});

describe("patient.created event contract", () => {
  it("accepts version one events", () => {
    const result = patientCreatedEventSchema.safeParse({
      eventId: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa",
      eventType: "patient.created",
      occurredAt: "2026-09-16T00:00:00.000Z",
      producer: "patient-service",
      version: 1,
      organizationId: "11111111-1111-4111-8111-111111111111",
      clinicId: "22222222-2222-4222-8222-222222222222",
      correlationId: "44444444-4444-4444-8444-444444444444",
      payload: {
        patientId: "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb",
      },
    });

    expect(result.success).toBe(true);
  });
});
