import { NextResponse } from "next/server";
import { z } from "zod";
import { listDemoAppointments, updateDemoAppointment } from "@/lib/server/demo-store";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["Confirmed", "Waiting", "Completed"]),
});

function noStore(body: unknown, init?: ResponseInit) {
  return NextResponse.json(body, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers ?? {}),
    },
  });
}

export async function GET() {
  return noStore({ data: listDemoAppointments() });
}

export async function PATCH(request: Request) {
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return noStore({ error: "INVALID_REQUEST" }, { status: 400 });
  }

  const appointment = updateDemoAppointment(parsed.data.id, parsed.data.status);

  if (!appointment) {
    return noStore({ error: "APPOINTMENT_NOT_FOUND" }, { status: 404 });
  }

  return noStore({ data: appointment });
}
