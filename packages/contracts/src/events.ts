import { z } from "zod";

export const eventEnvelopeSchema = z.object({
  eventId: z.uuid(),
  eventType: z.string().min(1).max(200),
  occurredAt: z.iso.datetime(),
  producer: z.string().min(1).max(100),
  version: z.literal(1),
  organizationId: z.uuid(),
  clinicId: z.uuid(),
  correlationId: z.uuid(),
  causationId: z.uuid().optional(),
  payload: z.record(z.string(), z.unknown()),
});

export type EventEnvelopeV1 = z.infer<typeof eventEnvelopeSchema>;

export const patientCreatedEventSchema = eventEnvelopeSchema.extend({
  eventType: z.literal("patient.created"),
  payload: z.object({
    patientId: z.uuid(),
  }),
});

export type PatientCreatedEventV1 = z.infer<typeof patientCreatedEventSchema>;
