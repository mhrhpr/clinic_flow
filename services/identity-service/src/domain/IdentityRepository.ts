import type { ClinicMembership, User, UserId } from "./Identity.js";

export interface IdentityRepository {
  findUserById(userId: UserId): Promise<User | null>;
  findMembership(userId: UserId, clinicId: string): Promise<ClinicMembership | null>;
}
