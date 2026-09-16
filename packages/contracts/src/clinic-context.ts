import { z } from "zod";

export const userRoleSchema = z.enum([
  "OWNER",
  "ADMIN",
  "DOCTOR",
  "RECEPTIONIST",
  "ACCOUNTANT",
  "STAFF",
]);

export const clinicContextSchema = z.object({
  organizationId: z.uuid(),
  clinicId: z.uuid(),
  userId: z.uuid(),
  role: userRoleSchema,
  correlationId: z.uuid(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type ClinicContext = z.infer<typeof clinicContextSchema>;
