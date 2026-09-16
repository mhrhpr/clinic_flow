import { getClinicContext } from "@/personalization/clinicContext";

const cards = [
  ["Patients", "0", "Total active patients"],
  ["Appointments", "0", "Today"],
  ["Outstanding", "$0", "Open balance"],
  ["Revenue", "$0", "This month"],
] as const;

export default async function DashboardPage() {
  const context = await getClinicContext();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[var(--brand)]">Overview</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Clinic-aware dashboard foundation. Widgets will become configurable per clinic and role.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([title, value, helper]) => (
          <article key={title} className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
            <p className="text-sm text-[var(--muted)]">{title}</p>
            <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">{helper}</p>
          </article>
        ))}
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
