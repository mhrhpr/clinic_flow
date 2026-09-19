import type { ClinicContext } from "./types";

const defaultClinicContext: ClinicContext = {
  organizationId: "demo-organization",
  clinicId: "demo-clinic",
  role: "OWNER",
  configuration: {
    locale: "fa-IR",
    timezone: "Asia/Tehran",
    currency: "IRR",
    branding: {
      name: "کلینیک آیدا",
      primaryColor: "#0f766e",
    },
    features: {
      patients: true,
      appointments: true,
      treatments: true,
      billing: true,
      payments: true,
      expenses: true,
      analytics: true,
    },
  },
};

export async function getClinicContext(): Promise<ClinicContext> {
  return defaultClinicContext;
}
