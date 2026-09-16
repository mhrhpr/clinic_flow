import { AppShell } from "@/components/app-shell/AppShell";
import { getClinicContext } from "@/personalization/clinicContext";

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const context = await getClinicContext();

  return <AppShell context={context}>{children}</AppShell>;
}
