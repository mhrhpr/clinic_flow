import Link from "next/link";
import { CalendarDays, CircleDollarSign, LayoutDashboard, Users, Sparkles, Target } from "lucide-react";
import type { ClinicContext } from "@/personalization/types";
import { AidaBrand } from "@/components/brand/AidaBrand";

const navigation = [
  { href: "/dashboard", label: "داشبورد", icon: LayoutDashboard },
  { href: "/patients", label: "بیماران", icon: Users },
  { href: "/revenue", label: "فرصت‌های درآمدی", icon: Target },
  { href: "/appointments", label: "نوبت‌ها", icon: CalendarDays },
  { href: "/treatments", label: "درمان‌ها", icon: Sparkles },
  { href: "/invoices", label: "مالی", icon: CircleDollarSign },
];

export function AppShell({ context, children }: { context: ClinicContext; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--background)]" dir="rtl">
      <aside className="fixed inset-y-0 right-0 hidden w-64 border-l border-[var(--border)] bg-[var(--surface)] px-4 py-5 lg:block">
        <div className="mb-8 px-2"><AidaBrand /></div>
        <div className="mb-6 rounded-2xl bg-[var(--brand-soft)] p-4">
          <p className="text-xs font-semibold text-[var(--brand)]">مرکز عملیات</p>
          <p className="mt-1 truncate text-sm font-bold">{context.configuration.branding.name}</p>
        </div>
        <nav className="space-y-1" aria-label="ناوبری اصلی">
          {navigation.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:bg-[var(--background)] hover:text-[var(--foreground)]">
              <Icon size={17} aria-hidden="true" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--background)] p-4">
          <p className="text-xs font-semibold text-[var(--muted)]">نسخه نمایشی</p>
          <p className="mt-2 text-xs leading-5 text-[var(--muted)]">اطلاعات این محیط نمونه است و برای نمایش جریان محصول از داده‌ی آزمایشی استفاده می‌کند.</p>
        </div>
      </aside>

      <div className="lg:pr-64">
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--surface)]/95 px-4 py-3 backdrop-blur sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-sm font-semibold">{context.configuration.branding.name}</p><p className="mt-0.5 text-xs text-[var(--muted)]">نقش: مالک کلینیک</p></div>
            <span className="hidden rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)] sm:inline-flex">تومان · فارسی</span>
          </div>
        </header>

        <div className="border-b border-[var(--border)] bg-[var(--surface)] px-3 py-2 lg:hidden">
          <nav className="grid grid-cols-5 gap-1" aria-label="ناوبری اصلی">
            {navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex min-h-12 flex-col items-center justify-center rounded-xl px-1 py-1 text-[11px] font-medium text-[var(--muted)]"><Icon size={17} aria-hidden="true" /><span className="mt-1">{label}</span></Link>)}
          </nav>
        </div>

        <main className="mx-auto max-w-[1600px] p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
