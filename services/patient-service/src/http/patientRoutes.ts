import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreatePatient, DuplicatePatientError } from "../application/CreatePatient.js";
import { InMemoryPatientRepository } from "../infrastructure/InMemoryPatientRepository.js";
import { createPatientBodySchema, patientIdParamsSchema } from "./schemas.js";

const repository = new InMemoryPatientRepository();
const createPatientUseCase = new CreatePatient(repository);

type CreatePatientRequest = FastifyRequest<{ Body: unknown }>;
type PatientRequest = FastifyRequest<{ Params: unknown }>;

export async function registerPatientRoutes(app: FastifyInstance): Promise<void> {
  app.get("/health", async () => ({ service: "patient-service", status: "ok" }));

  app.get("/patients", async (request, reply) => {
    const clinicId = getClinicId(request);
    const patients = await repository.list(clinicId);
    return reply.send({ data: patients });
  });

  app.get("/patients/:patientId", async (request, reply) => {
    const params = patientIdParamsSchema.parse((request as PatientRequest).params);
    const clinicId = getClinicId(request);
    const patient = await repository.findById(clinicId, params.patientId);

    if (!patient) {
      return reply.code(404).send({ error: "PATIENT_NOT_FOUND" });
    }

    return reply.send({ data: patient });
  });

  app.post("/patients", async (request, reply) => {
    try {
      const body = createPatientBodySchema.parse((request as CreatePatientRequest).body);
      const clinicId = getClinicId(request);
      const patient = await createPatientUseCase.execute({ clinicId, ...body });
      return reply.code(201).send({ data: patient });
    } catch (error) {
      if (error instanceof DuplicatePatientError) {
        return reply.code(409).send({ error: "DUPLICATE_PATIENT" });
      }

      throw error;
    }
  });
}

function getClinicId(request: FastifyRequest): string {
  const clinicId = request.headers["x-clinic-id"];

  if (typeof clinicId !== "string" || clinicId.trim().length === 0) {
    const error = new Error("Missing x-clinic-id header.");
    error.name = "MissingClinicContextError";
    throw error;
  }

  return clinicId.trim();
}
