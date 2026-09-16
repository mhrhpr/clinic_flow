import { describe, expect, it } from "vitest";
import { createPatient } from "./Patient.js";

describe("createPatient", () => {
  it("creates a normalized active patient", () => {
    const now = new Date("2026-01-01T10:00:00.000Z");

    const patient = createPatient(
      {
        clinicId: "clinic-1",
        firstName: "  Sara ",
        lastName: "  Ahmadi ",
        email: "SARA@example.com",
        phone: " 09120000000 ",
      },
      now,
    );

    expect(patient).toMatchObject({
      clinicId: "clinic-1",
      firstName: "Sara",
      lastName: "Ahmadi",
      email: "sara@example.com",
      phone: "09120000000",
      isActive: true,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    });
    expect(patient.id).toBeTypeOf("string");
  });
});
