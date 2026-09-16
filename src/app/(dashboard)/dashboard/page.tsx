import { getClinicContext } from "@/personalization/clinicContext";
import { getEnabledDashboardWidgets } from "@/personalization/dashboard";

const values: Record<string, { value: string; helper: string }> = {
  patients: { value: "0", helper: "Total active patients" },
  appointments: { value: "0", helper: "Today" },
  outstanding: { value: "$0", helper: "Open balance" },
  revenue: { value: "$0", helper: "This month" },
};

export default async function DashboardPage() {
  const context = await getClinicContext();
  const widgets = getEnabledDashboardWidgets(context);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[var(--brand)]">Overview</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Widgets are resolved through clinic configuration rather than hard-coded into the page.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {widgets.map((widget) => {
          const data = values[widget.key] ?? { value: "—", helper: widget.description };
          return (
            <article key={widget.key} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
              <p className="text-sm text-[var(--muted)]">{widget.title}</p>
              <p className="mt-3 text-3xl font-bold tracking-tight">{data.value}</p>
              <p className="mt-2 text-xs text-[var(--muted)]">{data.helper}</p>
            </article>
          );
        })}
      </div>

      <article className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Clinic context</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div><dt className="text-xs text-[var(--muted)]">Organization</dt><dd className="mt-1 text-sm font-medium">{context.organizationId}</dd></div>
          <div><dt className="text-xs text-[var(--muted)]">Clinic</dt><dd className="mt-1 text-sm font-medium">{context.clinicId}</dd></div>
          <div><dt className="text-xs text-[var(--muted)]">Timezone</dt><dd className="mt-1 text-sm font-medium">{context.configuration.timezone}</dd></div>
          <div><dt className="text-xs text-[var(--muted)]">Currency</dt><dd className="mt-1 text-sm font-medium">{context.configuration.currency}</dd></div>
        </dl>
      </article>
    </section>
  );
}
