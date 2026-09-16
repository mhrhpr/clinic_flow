export type UserId = string;
export type MembershipId = string;

export type UserRole =
  | "OWNER"
  | "ADMIN"
  | "DOCTOR"
  | "RECEPTIONIST"
  | "ACCOUNTANT"
  | "STAFF";

export type User = Readonly<{
  id: UserId;
  email: string;
  displayName: string;
  isActive: boolean;
}>;

export type ClinicMembership = Readonly<{
  id: MembershipId;
  userId: UserId;
  organizationId: string;
  clinicId: string;
  role: UserRole;
  isActive: boolean;
}>;
