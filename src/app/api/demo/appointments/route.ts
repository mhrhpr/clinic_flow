import { NextResponse } from "next/server";
import { z } from "zod";
import { listDemoAppointments, updateDemoAppointment } from "@/lib/server/demo-store";

const updateSchema = z.object({
  index: z.number().int().min(0),
  status: z.enum(["Confirmed", "Waiting", "Completed"]),
});

export async function GET() {
  return NextResponse.json({ data: listDemoAppointments() });
}

export async function PATCH(request: Request) {
  const parsed = updateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID_REQUEST" }, { status: 400 });
  const appointment = updateDemoAppointment(parsed.data.index, parsed.data.status);
  if (!appointment) return NextResponse.json({ error: "APPOINTMENT_NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ data: appointment });
}
