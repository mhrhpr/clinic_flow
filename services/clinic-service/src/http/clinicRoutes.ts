import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import { GetClinicConfiguration } from "../application/GetClinicConfiguration.js";
import { InMemoryClinicConfigurationRepository } from "../infrastructure/InMemoryClinicConfigurationRepository.js";

const clinicIdParamsSchema = z.object({ clinicId: z.uuid() });
const useCase = new GetClinicConfiguration(
  new InMemoryClinicConfigurationRepository(),
);

export const clinicRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => ({ service: "clinic-service", status: "ok" }));

  app.get("/v1/clinics/:clinicId/configuration", async (request, reply) => {
    const parsed = clinicIdParamsSchema.safeParse(request.params);

    if (!parsed.success) {
      return reply.code(400).send({
        code: "INVALID_REQUEST",
        message: "clinicId must be a valid UUID.",
      });
    }

    const configuration = await useCase.execute(parsed.data.clinicId);
    return reply.code(200).send(configuration);
  });
};
