import type { ClinicMembership, User } from "../domain/Identity.js";
import type { IdentityRepository } from "../domain/IdentityRepository.js";

export class IdentityNotFoundError extends Error {
  constructor() {
    super("Identity record was not found.");
    this.name = "IdentityNotFoundError";
  }
}

export class ClinicAccessDeniedError extends Error {
  constructor() {
    super("User does not have an active membership for this clinic.");
    this.name = "ClinicAccessDeniedError";
  }
}

export type ResolvedClinicAccess = Readonly<{
  user: User;
  membership: ClinicMembership;
}>;

export class ResolveClinicAccess {
  constructor(private readonly repository: IdentityRepository) {}

  async execute(userId: string, clinicId: string): Promise<ResolvedClinicAccess> {
    const [user, membership] = await Promise.all([
      this.repository.findUserById(userId),
      this.repository.findMembership(userId, clinicId),
    ]);

    if (!user || !user.isActive) {
      throw new IdentityNotFoundError();
    }

    if (!membership || !membership.isActive) {
      throw new ClinicAccessDeniedError();
    }

    return { user, membership };
  }
}
