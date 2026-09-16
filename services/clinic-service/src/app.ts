import Fastify from "fastify";
import { ClinicNotFoundError } from "./application/GetClinicConfiguration.js";
import { clinicRoutes } from "./http/clinicRoutes.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.setErrorHandler((error, request, reply) => {
    request.log.error({ err: error }, "Unhandled request error");

    if (error instanceof ClinicNotFoundError) {
      return reply.code(404).send({
        code: "CLINIC_NOT_FOUND",
        message: "Clinic was not found.",
      });
    }

    return reply.code(500).send({
      code: "INTERNAL_ERROR",
      message: "An unexpected error occurred.",
    });
  });

  app.register(clinicRoutes);

  return app;
}
