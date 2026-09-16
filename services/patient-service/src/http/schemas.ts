import { z } from "zod";

export const createPatientBodySchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  dateOfBirth: z.iso.datetime().optional(),
  phone: z.string().trim().min(3).max(32).optional(),
  email: z.email().optional(),
  notes: z.string().max(5000).optional(),
});

export const patientIdParamsSchema = z.object({
  patientId: z.uuid(),
});

export type CreatePatientBody = z.infer<typeof createPatientBodySchema>;
