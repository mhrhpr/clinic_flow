import type { Patient, PatientId } from "../domain/entities/Patient.js";
import type { PatientRepository } from "../domain/repositories/PatientRepository.js";

export class InMemoryPatientRepository implements PatientRepository {
  private readonly patients = new Map<PatientId, Patient>();

  async create(patient: Patient): Promise<Patient> {
    this.patients.set(patient.id, patient);
    return patient;
  }

  async findById(clinicId: string, patientId: PatientId): Promise<Patient | null> {
    const patient = this.patients.get(patientId);
    return patient?.clinicId === clinicId ? patient : null;
  }

  async findByPhone(clinicId: string, phone: string): Promise<Patient | null> {
    for (const patient of this.patients.values()) {
      if (patient.clinicId === clinicId && patient.phone === phone && patient.isActive) {
        return patient;
      }
    }

    return null;
  }

  async list(clinicId: string): Promise<readonly Patient[]> {
    return [...this.patients.values()].filter((patient) => patient.clinicId === clinicId && patient.isActive);
  }
}
