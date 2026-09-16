import type { ClinicContext } from "./types";

const defaultClinicContext: ClinicContext = {
  organizationId: "demo-organization",
  clinicId: "demo-clinic",
  role: "OWNER",
  configuration: {
    locale: "en-US",
    timezone: "UTC",
    currency: "USD",
    branding: {
      name: "Demo Clinic",
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

/**
 * Temporary development context.
 * Replace this implementation with the authenticated tenant resolver when auth is wired.
 */
export async function getClinicContext(): Promise<ClinicContext> {
  return defaultClinicContext;
}
