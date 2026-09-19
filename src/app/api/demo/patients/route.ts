import { NextResponse } from "next/server";
import { z } from "zod";
import { createDemoPatient, listDemoPatients } from "@/lib/server/demo-store";

export const dynamic = "force-dynamic";

const createPatientSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().max(32).default(""),
  service: z.string().trim().max(120).default("General consultation"),
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

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  return noStore({ data: listDemoPatients(query) });
}

export async function POST(request: Request) {
  const parsed = createPatientSchema.safeParse(await request.json().catch(() => null));

  if (!parsed.success) {
    return noStore(
      { error: "INVALID_REQUEST", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const result = createDemoPatient(parsed.data);

  if (result.conflict) {
    return noStore({ error: "DUPLICATE_PATIENT" }, { status: 409 });
  }

  return noStore({ data: result.patient }, { status: 201 });
}
