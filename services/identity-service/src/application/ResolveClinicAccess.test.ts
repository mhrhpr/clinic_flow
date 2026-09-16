import { describe, expect, it } from "vitest";
import {
  ClinicAccessDeniedError,
  IdentityNotFoundError,
  ResolveClinicAccess,
} from "./ResolveClinicAccess.js";
import { InMemoryIdentityRepository } from "../infrastructure/InMemoryIdentityRepository.js";

describe("ResolveClinicAccess", () => {
  const useCase = new ResolveClinicAccess(new InMemoryIdentityRepository());

  it("resolves active membership", async () => {
    const result = await useCase.execute(
      "00000000-0000-4000-8000-000000000020",
      "00000000-0000-4000-8000-000000000001",
    );

    expect(result.membership.role).toBe("OWNER");
  });

  it("rejects unknown users", async () => {
    await expect(
      useCase.execute(
        "00000000-0000-4000-8000-000000000099",
        "00000000-0000-4000-8000-000000000001",
      ),
    ).rejects.toBeInstanceOf(IdentityNotFoundError);
  });

  it("rejects users without clinic membership", async () => {
    await expect(
      useCase.execute(
        "00000000-0000-4000-8000-000000000020",
        "00000000-0000-4000-8000-000000000099",
      ),
    ).rejects.toBeInstanceOf(ClinicAccessDeniedError);
  });
});
