export default function DashboardLoading() {
  return <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-28 animate-pulse rounded-2xl border border-[var(--border)] bg-[var(--surface)]" />)}</div>;
}
