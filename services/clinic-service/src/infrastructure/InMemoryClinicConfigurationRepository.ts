import type {
  ClinicBranding,
  ClinicConfiguration,
  ClinicFeatures,
} from "../domain/ClinicConfiguration.js";
import type { ClinicConfigurationRepository } from "../domain/ClinicConfigurationRepository.js";

const defaultFeatures: ClinicFeatures = {
  patients: true,
  appointments: true,
  treatments: true,
  billing: true,
  payments: true,
  expenses: true,
  analytics: true,
};

const defaultBranding: ClinicBranding = {
  name: "ClinicFlow Demo Clinic",
};

export class InMemoryClinicConfigurationRepository
  implements ClinicConfigurationRepository
{
  private readonly configurations = new Map<string, ClinicConfiguration>([
    [
      "00000000-0000-4000-8000-000000000001",
      {
        clinicId: "00000000-0000-4000-8000-000000000001",
        organizationId: "00000000-0000-4000-8000-000000000010",
        locale: "en-US",
        timezone: "UTC",
        currency: "USD",
        branding: defaultBranding,
        features: defaultFeatures,
      },
    ],
  ]);

  async findByClinicId(clinicId: string): Promise<ClinicConfiguration | null> {
    return this.configurations.get(clinicId) ?? null;
  }
}
