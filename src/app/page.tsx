import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-xl rounded-[var(--radius)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--brand)]">ClinicFlow</p>
        <h1 className="text-3xl font-bold tracking-tight">Clinic operations, designed around the clinic.</h1>
        <p className="mt-4 leading-7 text-[var(--muted)]">
          Multi-tenant, multi-branch and configurable by clinic. The application foundation is now in place.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-lg bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-[var(--brand-foreground)]"
        >
          Open dashboard
        </Link>
      </section>
    </main>
  );
}
