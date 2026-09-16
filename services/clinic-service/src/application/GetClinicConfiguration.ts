import type { ClinicConfigurationRepository } from "../domain/ClinicConfigurationRepository.js";
import type { ClinicConfiguration } from "../domain/ClinicConfiguration.js";

export class ClinicNotFoundError extends Error {
  constructor(clinicId: string) {
    super(`Clinic '${clinicId}' was not found.`);
    this.name = "ClinicNotFoundError";
  }
}

export class GetClinicConfiguration {
  constructor(private readonly repository: ClinicConfigurationRepository) {}

  async execute(clinicId: string): Promise<ClinicConfiguration> {
    const configuration = await this.repository.findByClinicId(clinicId);

    if (!configuration) {
      throw new ClinicNotFoundError(clinicId);
    }

    return configuration;
  }
}
