export default function PatientsPage() {
  return <Page title="Patients" description="Patient 360 module foundation." />;
}

function Page({ title, description }: { title: string; description: string }) {
  return (
    <section className="rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
    </section>
  );
}
