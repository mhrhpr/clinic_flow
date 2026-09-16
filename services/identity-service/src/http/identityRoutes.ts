import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";
import {
  ClinicAccessDeniedError,
  IdentityNotFoundError,
  ResolveClinicAccess,
} from "../application/ResolveClinicAccess.js";
import { InMemoryIdentityRepository } from "../infrastructure/InMemoryIdentityRepository.js";

const paramsSchema = z.object({
  userId: z.uuid(),
  clinicId: z.uuid(),
});

const useCase = new ResolveClinicAccess(new InMemoryIdentityRepository());

export const identityRoutes: FastifyPluginAsync = async (app) => {
  app.get("/health", async () => ({ service: "identity-service", status: "ok" }));

  app.get("/v1/access/:userId/:clinicId", async (request, reply) => {
    const parsed = paramsSchema.safeParse(request.params);

    if (!parsed.success) {
      return reply.code(400).send({
        code: "INVALID_REQUEST",
        message: "userId and clinicId must be valid UUIDs.",
      });
    }

    try {
      const access = await useCase.execute(
        parsed.data.userId,
        parsed.data.clinicId,
      );

      return reply.code(200).send({
        userId: access.user.id,
        organizationId: access.membership.organizationId,
        clinicId: access.membership.clinicId,
        role: access.membership.role,
      });
    } catch (error) {
      if (error instanceof IdentityNotFoundError) {
        return reply.code(404).send({
          code: "IDENTITY_NOT_FOUND",
          message: "Identity was not found.",
        });
      }

      if (error instanceof ClinicAccessDeniedError) {
        return reply.code(403).send({
          code: "CLINIC_ACCESS_DENIED",
          message: "User is not authorized for this clinic.",
        });
      }

      throw error;
    }
  });
};
