export type ClinicFeatures = Readonly<{
  patients: boolean;
  appointments: boolean;
  treatments: boolean;
  billing: boolean;
  payments: boolean;
  expenses: boolean;
  analytics: boolean;
}>;

export type ClinicBranding = Readonly<{
  name: string;
  logoUrl?: string;
  primaryColor?: string;
}>;

export type ClinicConfiguration = Readonly<{
  clinicId: string;
  organizationId: string;
  locale: string;
  timezone: string;
  currency: string;
  branding: ClinicBranding;
  features: ClinicFeatures;
}>;
