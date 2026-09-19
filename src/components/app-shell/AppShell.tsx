import Link from "next/link";
import { CalendarDays, CircleDollarSign, LayoutDashboard, Users, Sparkles } from "lucide-react";
import type { ClinicContext } from "@/personalization/types";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/patients", label: "Patients", icon: Users },
  { href: "/appointments", label: "Appointments", icon: CalendarDays },
  { href: "/treatments", label: "Treatments", icon: Sparkles },
  { href: "/invoices", label: "Billing", icon: CircleDollarSign },
];

export function AppShell({ context, children }: { context: ClinicContext; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-[var(--border)] bg-[var(--surface)] px-4 py-5 lg:block">
        <div className="mb-8 px-2">
          <div className="text-xl font-semibold tracking-tight">ClinicFlow</div>
          <div className="mt-1 truncate text-sm text-[var(--muted)]">{context.configuration.branding.name}</div>
        </div>
        <nav className="space-y-1" aria-label="Primary navigation">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]">
              <Icon size={17} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">Preview workspace</p>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Demo data is isolated from production persistence while the service layer is being connected.</p>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-sm font-semibold">{context.configuration.branding.name}</p><p className="text-xs text-[var(--muted)]">Role: {context.role}</p></div>
            <span className="hidden rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)] sm:inline-flex">{context.configuration.currency} · {context.configuration.locale}</span>
          </div>
        </header>

        <div className="border-b border-[var(--border)] bg-[var(--surface)] px-3 py-2 lg:hidden">
          <nav className="grid grid-cols-5 gap-1" aria-label="Mobile navigation">
            {navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex min-h-12 flex-col items-center justify-center rounded-xl px-1 py-1 text-[11px] font-medium text-[var(--muted)]"><Icon size={17} aria-hidden="true" /><span className="mt-1">{label}</span></Link>)}
          </nav>
        </div>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
