import type { ClinicConfiguration } from "./ClinicConfiguration.js";

export interface ClinicConfigurationRepository {
  findByClinicId(clinicId: string): Promise<ClinicConfiguration | null>;
}
