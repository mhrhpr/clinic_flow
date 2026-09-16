import { describe, expect, it } from "vitest";
import { ClinicNotFoundError, GetClinicConfiguration } from "./GetClinicConfiguration.js";
import { InMemoryClinicConfigurationRepository } from "../infrastructure/InMemoryClinicConfigurationRepository.js";

describe("GetClinicConfiguration", () => {
  const useCase = new GetClinicConfiguration(
    new InMemoryClinicConfigurationRepository(),
  );

  it("returns configuration for a known clinic", async () => {
    const result = await useCase.execute(
      "00000000-0000-4000-8000-000000000001",
    );

    expect(result.currency).toBe("USD");
    expect(result.features.patients).toBe(true);
  });

  it("raises a domain-facing not found error for an unknown clinic", async () => {
    await expect(
      useCase.execute("00000000-0000-4000-8000-000000000099"),
    ).rejects.toBeInstanceOf(ClinicNotFoundError);
  });
});
