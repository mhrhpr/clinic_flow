import Link from "next/link";
import type { ClinicContext } from "@/personalization/types";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/patients", label: "Patients" },
  { href: "/appointments", label: "Appointments" },
  { href: "/treatments", label: "Treatments" },
  { href: "/invoices", label: "Billing" },
];

export function AppShell({ context, children }: { context: ClinicContext; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--border)] bg-[var(--surface)] p-5 lg:block">
        <div className="mb-8">
          <div className="text-lg font-bold">ClinicFlow</div>
          <div className="mt-1 truncate text-sm text-[var(--muted)]">{context.configuration.branding.name}</div>
        </div>
        <nav className="space-y-1">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-lg px-3 py-2 text-sm hover:bg-black/[0.04]">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-[var(--border)] bg-[var(--surface)]/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{context.configuration.branding.name}</p>
              <p className="text-xs text-[var(--muted)]">Role: {context.role}</p>
            </div>
            <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
              {context.configuration.currency} · {context.configuration.locale}
            </span>
          </div>
        </header>
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
