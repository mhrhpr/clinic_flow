import type { Patient, PatientId } from "../entities/Patient.js";

export interface PatientRepository {
  create(patient: Patient): Promise<Patient>;
  findById(clinicId: string, patientId: PatientId): Promise<Patient | null>;
  findByPhone(clinicId: string, phone: string): Promise<Patient | null>;
  list(clinicId: string): Promise<readonly Patient[]>;
}
