export type ClinicFeatures = {
  patients: boolean;
  appointments: boolean;
  treatments: boolean;
  billing: boolean;
  payments: boolean;
  expenses: boolean;
  analytics: boolean;
};

export type ClinicBranding = {
  name: string;
  logoUrl?: string;
  primaryColor: string;
};

export type ClinicConfiguration = {
  locale: string;
  timezone: string;
  currency: string;
  branding: ClinicBranding;
  features: ClinicFeatures;
};

export type ClinicContext = {
  organizationId: string;
  clinicId: string;
  userId?: string;
  role: "OWNER" | "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "ACCOUNTANT" | "STAFF";
  configuration: ClinicConfiguration;
};
