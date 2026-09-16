export type PatientId = string;

export type Patient = Readonly<{
  id: PatientId;
  clinicId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}>;

export type CreatePatientInput = Readonly<{
  clinicId: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  phone?: string;
  email?: string;
  notes?: string;
}>;

export function createPatient(input: CreatePatientInput, now = new Date()): Patient {
  const timestamp = now.toISOString();

  return {
    id: crypto.randomUUID(),
    clinicId: input.clinicId,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    ...(input.dateOfBirth ? { dateOfBirth: input.dateOfBirth } : {}),
    ...(input.phone ? { phone: input.phone.trim() } : {}),
    ...(input.email ? { email: input.email.trim().toLowerCase() } : {}),
    ...(input.notes ? { notes: input.notes.trim() } : {}),
    isActive: true,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}
