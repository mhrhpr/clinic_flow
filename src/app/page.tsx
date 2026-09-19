import Link from "next/link";
import { ArrowLeft, CalendarDays, ChartNoAxesCombined, CircleDollarSign, HeartPulse, ShieldCheck, Sparkles, Users } from "lucide-react";
import { AidaBrand } from "@/components/brand/AidaBrand";

const highlights = [
  { label: "پرونده فعال", value: "۲۴۸", detail: "بیمار تحت پیگیری", icon: Users },
  { label: "نوبت امروز", value: "۱۸", detail: "۴ نوبت باقی‌مانده", icon: CalendarDays },
  { label: "پیگیری درمان", value: "۱۲", detail: "در انتظار اقدام", icon: HeartPulse },
];

const modules = [
  { title: "مدیریت بیمار", description: "پرونده، سابقه مراجعه و وضعیت پیگیری هر بیمار در یک نمای یکپارچه.", icon: Users },
  { title: "برنامه‌ریزی نوبت", description: "صف نوبت، وضعیت مراجعه و هماهنگی تیم درمان از یک نقطه کنترل می‌شود.", icon: CalendarDays },
  { title: "درمان و درآمد", description: "خدمات انجام‌شده، برنامه درمان، پرداخت‌ها و مانده حساب در کنار هم.", icon: CircleDollarSign },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[var(--background)]" dir="rtl">
      <div className="landing-glow" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-[var(--border)]/80 pb-5">
          <AidaBrand />
          <div className="hidden items-center gap-8 text-sm font-medium text-[var(--muted)] md:flex">
            <span>مدیریت هوشمند کلینیک</span>
            <span>نسخه نمایشی محصول</span>
          </div>
          <Link href="/dashboard" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--brand)]">
            ورود به داشبورد
          </Link>
        </header>

        <section className="grid items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.02fr_.98fr] lg:pb-24 lg:pt-20">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)]/15 bg-[var(--brand-soft)] px-3.5 py-1.5 text-xs font-semibold text-[var(--brand)]">
              <Sparkles size={14} aria-hidden="true" />
              عملیات یکپارچه برای کلینیک آیدا
            </div>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              کلینیک آیدا را
              <span className="block text-[var(--brand)]">ساده‌تر، دقیق‌تر و منظم‌تر</span>
              اداره کنید.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] sm:text-lg">
              ClinicFlow یک مرکز کنترل برای تیم کلینیک است؛ جایی که بیمار، نوبت، درمان و درآمد به‌جای چند ابزار پراکنده، در یک جریان عملیاتی قابل مشاهده قرار می‌گیرند.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--brand)]/15 transition hover:-translate-y-0.5">
                مشاهده داشبورد
                <ArrowLeft size={17} aria-hidden="true" />
              </Link>
              <span className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium text-[var(--muted)]">
                طراحی شده برای تیم آیدا
              </span>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {highlights.map(({ label, value, detail, icon: Icon }) => (
                <article key={label} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-4 shadow-sm">
                  <Icon size={17} className="text-[var(--brand)]" aria-hidden="true" />
                  <p className="mt-4 text-xs font-medium text-[var(--muted)]">{label}</p>
                  <p className="mt-1 text-2xl font-black tracking-tight">{value}</p>
                  <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">{detail}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl shadow-slate-900/8">
              <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="aida-mark aida-mark-lg" aria-hidden="true">
                      <span className="text-sm font-bold">A</span>
                    </span>
                    <div>
                      <p className="text-sm font-bold">مرکز عملیات آیدا</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">شنبه، ۲۹ شهریور ۱۴۰۵</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[var(--success-soft)] px-3 py-1 text-[11px] font-semibold text-[var(--success)]">وضعیت پایدار</span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-xs text-[var(--muted)]">درآمد ماه</p>
                    <p className="mt-2 text-2xl font-black">۱۲٫۴۸ م</p>
                    <p className="mt-1 text-[11px] text-[var(--success)]">۸٫۴٪ رشد</p>
                  </article>
                  <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                    <p className="text-xs text-[var(--muted)]">مانده حساب‌ها</p>
                    <p className="mt-2 text-2xl font-black">۳٫۲۴ م</p>
                    <p className="mt-1 text-[11px] text-[var(--muted)]">۱۸ فاکتور باز</p>
                  </article>
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold">صف نوبت امروز</p>
                      <p className="mt-1 text-xs text-[var(--muted)]">نمای لحظه‌ای جریان مراجعه</p>
                    </div>
                    <ChartNoAxesCombined size={20} className="text-[var(--brand)]" aria-hidden="true" />
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["۰۹:۳۰", "سارا محمدی", "مشاوره پوست", "تأیید شده"],
                      ["۱۰:۱۵", "النا کریمی", "جوان‌سازی پوست", "در انتظار"],
                      ["۱۱:۰۰", "مریم حسینی", "مشاوره بوتاکس", "تأیید شده"],
                    ].map(([time, patient, service, status]) => (
                      <div key={time} className="flex items-center gap-3 rounded-xl bg-[var(--background)] px-3 py-3">
                        <span className="w-12 text-xs font-bold">{time}</span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{patient}</p>
                          <p className="mt-0.5 truncate text-[11px] text-[var(--muted)]">{service}</p>
                        </div>
                        <span className="rounded-full bg-[var(--brand-soft)] px-2.5 py-1 text-[10px] font-semibold text-[var(--brand)]">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-2xl bg-[var(--brand)] p-4 text-white">
                  <div>
                    <p className="text-sm font-bold">یک تصمیم، یک جریان</p>
                    <p className="mt-1 text-xs text-white/75">از پذیرش تا پیگیری درمان</p>
                  </div>
                  <ShieldCheck size={23} aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border)] py-14 lg:py-18">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-[var(--brand)]">ساختار محصول</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">تمام عملیات اصلی، در یک زبان مشترک.</h2>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
              طراحی ClinicFlow حول تصمیم‌های روزمره کلینیک انجام شده است؛ نه صرفاً حول فرم‌ها و جدول‌های جدا از هم.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {modules.map(({ title, description, icon: Icon }, index) => (
              <article key={title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
                    <Icon size={19} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold text-[var(--muted)]">۰{index + 1}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pb-12 pt-2">
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="text-sm font-semibold text-[var(--brand)]">برای کلینیک آیدا</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight">از صفحه‌ی امروز شروع کنید.</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">داشبورد عملیاتی، بیماران و نوبت‌ها همین حالا در نسخه نمایشی در دسترس‌اند.</p>
            </div>
            <Link href="/dashboard" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white">
              ورود به ClinicFlow
              <ArrowLeft size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
