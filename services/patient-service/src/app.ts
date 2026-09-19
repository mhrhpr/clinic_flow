import Fastify, { type FastifyInstance } from "fastify";
import { registerPatientRoutes } from "./http/patientRoutes.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: true,
  });

  app.setErrorHandler((error, _request, reply) => {
    app.log.error(error instanceof Error ? error : new Error(String(error)));
    const errorName = error instanceof Error ? error.name : "";

    if (errorName === "ZodError") {
      return reply.code(400).send({ error: "INVALID_REQUEST" });
    }

    if (errorName === "MissingClinicContextError") {
      return reply.code(400).send({ error: "MISSING_CLINIC_CONTEXT" });
    }

    return reply.code(500).send({ error: "INTERNAL_SERVER_ERROR" });
  });

  app.register(registerPatientRoutes);
  return app;
}
