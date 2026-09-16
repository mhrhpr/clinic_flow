import type { ClinicContext } from "./types";

export type DashboardWidget = {
  key: string;
  title: string;
  description: string;
  enabled: (context: ClinicContext) => boolean;
};

export const dashboardWidgets: DashboardWidget[] = [
  { key: "patients", title: "Patients", description: "Patient volume and activity", enabled: (c) => c.configuration.features.patients },
  { key: "appointments", title: "Appointments", description: "Today's schedule and utilization", enabled: (c) => c.configuration.features.appointments },
  { key: "outstanding", title: "Outstanding", description: "Open invoice balances", enabled: (c) => c.configuration.features.billing && c.configuration.features.payments },
  { key: "revenue", title: "Revenue", description: "Revenue overview", enabled: (c) => c.configuration.features.analytics },
];

export function getEnabledDashboardWidgets(context: ClinicContext) {
  return dashboardWidgets.filter((widget) => widget.enabled(context));
}
