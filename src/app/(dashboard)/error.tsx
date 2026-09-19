"use client";

export default function DashboardError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8"><h1 className="text-xl font-semibold">Clinic workspace failed to load</h1><p className="mt-2 text-sm text-[var(--muted)]">The workspace hit an unexpected error. Retry the request before leaving the current context.</p><button onClick={reset} className="mt-5 rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white">Retry</button></section>;
}
