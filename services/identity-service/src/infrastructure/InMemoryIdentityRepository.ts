import type { IdentityRepository } from "../domain/IdentityRepository.js";
import type { ClinicMembership, User } from "../domain/Identity.js";

const demoUser: User = {
  id: "00000000-0000-4000-8000-000000000020",
  email: "owner@clinicflow.local",
  displayName: "ClinicFlow Owner",
  isActive: true,
};

const demoMembership: ClinicMembership = {
  id: "00000000-0000-4000-8000-000000000021",
  userId: demoUser.id,
  organizationId: "00000000-0000-4000-8000-000000000010",
  clinicId: "00000000-0000-4000-8000-000000000001",
  role: "OWNER",
  isActive: true,
};

export class InMemoryIdentityRepository implements IdentityRepository {
  async findUserById(userId: string): Promise<User | null> {
    return userId === demoUser.id ? demoUser : null;
  }

  async findMembership(
    userId: string,
    clinicId: string,
  ): Promise<ClinicMembership | null> {
    return userId === demoMembership.userId && clinicId === demoMembership.clinicId
      ? demoMembership
      : null;
  }
}
