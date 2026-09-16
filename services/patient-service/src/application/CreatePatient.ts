import { createPatient, type CreatePatientInput, type Patient } from "../domain/entities/Patient.js";
import type { PatientRepository } from "../domain/repositories/PatientRepository.js";

export class DuplicatePatientError extends Error {
  constructor() {
    super("A patient with the same phone number already exists in this clinic.");
    this.name = "DuplicatePatientError";
  }
}

export class CreatePatient {
  constructor(private readonly repository: PatientRepository) {}

  async execute(input: CreatePatientInput): Promise<Patient> {
    if (input.phone) {
      const existingPatient = await this.repository.findByPhone(input.clinicId, input.phone.trim());

      if (existingPatient) {
        throw new DuplicatePatientError();
      }
    }

    const patient = createPatient(input);
    return this.repository.create(patient);
  }
}
