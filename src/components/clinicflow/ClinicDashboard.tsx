"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { DemoAppointment, DemoPatient } from "@/lib/server/demo-store";

type Section = "dashboard" | "patients" | "appointments" | "treatments" | "billing";
type PatientFormResult = Pick<DemoPatient, "id" | "name" | "phone" | "service" | "status">;

const fallbackPatients: DemoPatient[] = [
  { id: "p-1", name: "سارا محمدی", phone: "۰۹۱۲ ۲۰۲ ۰۱۴۲", service: "مشاوره پوست", status: "Active" },
  { id: "p-2", name: "النا کریمی", phone: "۰۹۱۲ ۲۰۲ ۰۱۸۸", service: "جوان‌سازی پوست", status: "Follow-up" },
  { id: "p-3", name: "مریم حسینی", phone: "۰۹۱۲ ۲۰۲ ۰۱۲۹", service: "مشاوره بوتاکس", status: "New" },
  { id: "p-4", name: "نرگس رضایی", phone: "۰۹۱۲ ۲۰۲ ۰۱۷۵", service: "جلسه لیزر", status: "Active" },
];

const fallbackAppointments: DemoAppointment[] = [
  { id: "a-1", time: "09:30", patient: "سارا محمدی", doctor: "دکتر رحیمی", service: "مشاوره پوست", status: "Confirmed" },
  { id: "a-2", time: "10:15", patient: "النا کریمی", doctor: "دکتر رحیمی", service: "جوان‌سازی پوست", status: "Waiting" },
  { id: "a-3", time: "11:00", patient: "مریم حسینی", doctor: "دکتر نادری", service: "مشاوره بوتاکس", status: "Confirmed" },
  { id: "a-4", time: "13:30", patient: "نرگس رضایی", doctor: "دکتر نادری", service: "جلسه لیزر", status: "Completed" },
];

const statusLabels: Record<string, string> = {
  Active: "فعال",
  "Follow-up": "پیگیری",
  New: "جدید",
  Confirmed: "تأیید شده",
  Waiting: "در انتظار",
  Completed: "تکمیل شده",
};

function fa(value: string | number) {
  return String(value).replace(/[0-9]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)]);
}

export function ClinicDashboard({ section }: { section: Section }) {
  if (section === "patients") return <Patients />;
  if (section === "appointments") return <Appointments />;
  if (section === "treatments") {
    return <Module title="درمان‌ها" eyebrow="جریان درمان" description="برنامه‌های درمانی، خدمات انجام‌شده و پیگیری مراجعه بعدی را در یک نمای بیمارمحور مدیریت کنید." stats={["۱۸ برنامه فعال", "۷ پیگیری امروز", "۳ مورد نیازمند تأیید"]} />;
  }
  if (section === "billing") {
    return <Module title="مالی" eyebrow="عملیات درآمد" description="فاکتورها، پرداخت‌ها و مانده حساب‌ها را با نمای مالی اختصاصی کلینیک دنبال کنید." stats={["۱۲٫۴۸ میلیون تومان وصول", "۳٫۲۴ میلیون تومان مانده", "۱۸ فاکتور باز"]} />;
  }
  return <Dashboard />;
}

function useDemoAppointments() {
  const [items, setItems] = useState<DemoAppointment[]>(fallbackAppointments);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/demo/appointments", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("appointments-request-failed");
        return (await response.json()) as { data?: DemoAppointment[] };
      })
      .then((result) => { if (!cancelled && result.data) setItems(result.data); })
      .catch(() => { if (!cancelled) setError("اطلاعات زنده نسخه نمایشی بارگذاری نشد؛ داده نمونه نمایش داده می‌شود."); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
  }, []);

  return { items, setItems, loading, error };
}

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const { items, loading, error } = useDemoAppointments();

  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm font-semibold text-[var(--brand)]">امروز در کلینیک آیدا</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">صبح بخیر، تیم آیدا.</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">نمای عملیاتی کلینیک، در یک نگاه.</p>
          </div>
          <button type="button" onClick={() => setShowForm(true)} className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white">
            + ثبت بیمار جدید
          </button>
        </div>
      </header>

      {error && <Notice>{error}</Notice>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="بیماران فعال" value={fa("248")} note="۱۲ بیمار جدید این ماه" />
        <Metric label="نوبت‌های امروز" value={fa("18")} note="۴ نوبت باقی‌مانده" />
        <Metric label="مانده حساب" value="۳٫۲۴ م" note="۱۸ فاکتور باز" />
        <Metric label="درآمد ماه" value="۱۲٫۴۸ م" note="۸٫۴٪ رشد نسبت به ماه قبل" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">برنامه امروز</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">صف عملیاتی لحظه‌ای</p>
            </div>
            <Link href="/appointments" className="text-sm font-medium text-[var(--brand)]">مشاهده تقویم ←</Link>
          </div>
          <div className="mt-5 divide-y divide-[var(--border)]">
            {loading ? <p className="py-6 text-sm text-[var(--muted)]">در حال بارگذاری برنامه…</p> : items.map((appointment) => (
              <div key={appointment.id} className="grid grid-cols-[70px_1fr_auto] items-center gap-4 py-4">
                <b>{fa(appointment.time)}</b>
                <div>
                  <p className="text-sm font-medium">{appointment.patient}</p>
                  <p className="mt-1 text-xs text-[var(--muted)]">{appointment.service} · {appointment.doctor}</p>
                </div>
                <Status value={appointment.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <h2 className="font-semibold">اقدامات سریع</h2>
          <div className="mt-4 grid gap-3">
            <button type="button" onClick={() => setShowForm(true)} className="action-card">
              <p className="text-sm font-semibold">ثبت بیمار</p><p className="mt-1 text-xs text-[var(--muted)]">ایجاد پرونده بیمار جدید</p>
            </button>
            <Link href="/appointments" className="action-card">
              <p className="text-sm font-semibold">رزرو نوبت</p><p className="mt-1 text-xs text-[var(--muted)]">پیدا کردن زمان خالی بعدی</p>
            </Link>
            <Link href="/invoices" className="action-card">
              <p className="text-sm font-semibold">صدور فاکتور</p><p className="mt-1 text-xs text-[var(--muted)]">تبدیل خدمت انجام‌شده به صورتحساب</p>
            </Link>
            <Link href="/patients" className="action-card">
              <p className="text-sm font-semibold">پرونده ۳۶۰ درجه</p><p className="mt-1 text-xs text-[var(--muted)]">مشاهده مسیر کامل بیمار</p>
            </Link>
          </div>
        </section>
      </div>

      {showForm && <PatientForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

function Patients() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<DemoPatient[]>(fallbackPatients);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/demo/patients", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("patients-request-failed");
        return (await response.json()) as { data?: DemoPatient[] };
      })
      .then((result) => { if (!cancelled && result.data) setItems(result.data); })
      .catch(() => { if (!cancelled) setError("اطلاعات زنده نسخه نمایشی بارگذاری نشد؛ داده نمونه نمایش داده می‌شود."); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(
    () => items.filter((patient) => [patient.name, patient.phone, patient.service].join(" ").toLowerCase().includes(query.toLowerCase())),
    [items, query],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--brand)]">پرونده ۳۶۰ درجه</p>
          <h1 className="mt-1 text-3xl font-bold">بیماران</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">برای هر بیمار، یک پرونده عملیاتی یکپارچه.</p>
        </div>
        <button type="button" onClick={() => setShowForm(true)} className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white">+ ثبت بیمار جدید</button>
      </header>

      {error && <Notice>{error}</Notice>}

      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="border-b border-[var(--border)] p-4">
          <label htmlFor="patient-search" className="sr-only">جست‌وجوی بیمار، تلفن یا خدمت</label>
          <input id="patient-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="جست‌وجوی بیمار، تلفن یا خدمت…" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right text-sm">
            <caption className="sr-only">فهرست بیماران کلینیک</caption>
            <thead className="bg-[var(--background)] text-xs font-semibold text-[var(--muted)]">
              <tr><th scope="col" className="px-5 py-3">بیمار</th><th scope="col" className="px-5 py-3">تلفن</th><th scope="col" className="px-5 py-3">آخرین خدمت</th><th scope="col" className="px-5 py-3">وضعیت</th></tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-[var(--muted)]">در حال بارگذاری بیماران…</td></tr>
              : filtered.length === 0 ? <tr><td colSpan={4} className="px-5 py-8 text-center text-sm text-[var(--muted)]">بیماری مطابق جست‌وجوی شما پیدا نشد.</td></tr>
              : filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-[var(--background)]">
                  <td className="px-5 py-4 font-medium">{patient.name}</td>
                  <td className="px-5 py-4 text-[var(--muted)]">{patient.phone || "—"}</td>
                  <td className="px-5 py-4">{patient.service || "مشاوره عمومی"}</td>
                  <td className="px-5 py-4"><Status value={patient.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && <PatientForm onClose={() => setShowForm(false)} onCreated={(patient) => setItems((current) => [patient, ...current])} />}
    </div>
  );
}

function Appointments() {
  const { items, setItems, loading, error } = useDemoAppointments();
  const [savingId, setSavingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: DemoAppointment["status"]) {
    setSavingId(id);
    try {
      const response = await fetch("/api/demo/appointments", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ id, status }) });
      if (!response.ok) throw new Error("appointment-update-failed");
      const result = (await response.json()) as { data: DemoAppointment };
      setItems((current) => current.map((item) => item.id === id ? result.data : item));
    } finally { setSavingId(null); }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-[var(--brand)]">زمان‌بندی</p>
        <h1 className="mt-1 text-3xl font-bold">نوبت‌ها</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">پذیرش، پزشک و جریان مراجعه را با یک برنامه مشترک هماهنگ نگه دارید.</p>
      </header>
      {error && <Notice>{error}</Notice>}
      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="امروز" value={fa("18")} note="۴ نوبت باقی‌مانده" />
        <Metric label="تأیید شده" value={fa("14")} note="۷۸٪ از برنامه" />
        <Metric label="در انتظار" value={fa("2")} note="نیازمند توجه" />
      </div>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="divide-y divide-[var(--border)]">
          {loading ? <p className="py-6 text-sm text-[var(--muted)]">در حال بارگذاری نوبت‌ها…</p> : items.map((appointment) => (
            <div key={appointment.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-5">
                <b className="w-14">{fa(appointment.time)}</b>
                <div><p className="font-medium">{appointment.patient}</p><p className="mt-1 text-xs text-[var(--muted)]">{appointment.service} · {appointment.doctor}</p></div>
              </div>
              <label className="sr-only" htmlFor={`appointment-status-${appointment.id}`}>وضعیت نوبت {appointment.patient}</label>
              <select id={`appointment-status-${appointment.id}`} aria-label={`وضعیت نوبت ${appointment.patient}`} disabled={savingId === appointment.id} value={appointment.status} onChange={(event) => void updateStatus(appointment.id, event.target.value as DemoAppointment["status"])} className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-xs disabled:opacity-60">
                <option value="Confirmed">تأیید شده</option><option value="Waiting">در انتظار</option><option value="Completed">تکمیل شده</option>
              </select>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Module({ title, eyebrow, description, stats }: { title: string; eyebrow: string; description: string; stats: string[] }) {
  return (
    <div className="space-y-6">
      <header><p className="text-sm font-semibold text-[var(--brand)]">{eyebrow}</p><h1 className="mt-1 text-3xl font-bold">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p></header>
      <div className="grid gap-4 md:grid-cols-3">{stats.map((stat) => <article key={stat} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"><p className="text-lg font-semibold">{stat}</p><p className="mt-2 text-xs text-[var(--muted)]">شاخص عملیاتی اختصاصی کلینیک</p></article>)}</div>
      <article className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8"><h2 className="font-semibold">مرز سرویس آماده است</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">این رابط عمداً از مدل دامنه جدا شده تا لایه سرویس اصلی بدون انتقال منطق کسب‌وکار به صفحه، به آن متصل شود.</p></article>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-2 text-xs text-[var(--muted)]">{note}</p></article>;
}

function Status({ value }: { value: string }) {
  return <span className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-2.5 py-1 text-xs font-medium text-[var(--brand-dark)]">{statusLabels[value] ?? value}</span>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div role="status" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">{children}</div>;
}

function PatientForm({ onClose, onCreated }: { onClose: () => void; onCreated?: (patient: PatientFormResult) => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("مشاوره عمومی");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      const response = await fetch("/api/demo/patients", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, phone, service }) });
      const result = (await response.json().catch(() => null)) as { data?: PatientFormResult; error?: string } | null;
      if (response.status === 409) { setError("بیماری با این شماره تلفن از قبل ثبت شده است."); return; }
      if (!response.ok || !result?.data) { setError("ثبت بیمار انجام نشد. اطلاعات واردشده را بررسی و دوباره تلاش کنید."); return; }
      onCreated?.(result.data);
      onClose();
    } catch { setError("خطای ارتباط با سرور؛ دوباره تلاش کنید."); }
    finally { setSaving(false); }
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <form onSubmit={submit} role="dialog" aria-modal="true" aria-labelledby="new-patient-title" className="w-full max-w-md rounded-2xl bg-[var(--surface)] p-6 text-right shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div><h2 id="new-patient-title" className="text-lg font-semibold">ثبت بیمار جدید</h2><p className="mt-1 text-xs text-[var(--muted)]">این جریان در نسخه نمایشی است و ماندگاری داده پشت مرز سرویس انجام می‌شود.</p></div>
          <button type="button" onClick={onClose} aria-label="بستن پنجره" className="rounded-lg border border-[var(--border)] px-2 py-1 text-sm">×</button>
        </div>
        <div className="mt-5 space-y-4">
          <div><label htmlFor="patient-name" className="text-sm font-medium">نام و نام خانوادگی</label><input id="patient-name" name="name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required minLength={2} maxLength={120} className="mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" /></div>
          <div><label htmlFor="patient-phone" className="text-sm font-medium">شماره تلفن</label><input id="patient-phone" name="phone" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" maxLength={32} dir="ltr" className="mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" /></div>
          <div><label htmlFor="patient-service" className="text-sm font-medium">خدمت اولیه</label><input id="patient-service" name="service" value={service} onChange={(event) => setService(event.target.value)} maxLength={120} className="mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" /></div>
        </div>
        {error && <p role="alert" className="mt-3 text-sm text-[var(--danger)]">{error}</p>}
        <div className="mt-5 flex justify-start gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm">انصراف</button>
          <button type="submit" disabled={saving} className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">{saving ? "در حال ثبت…" : "ثبت بیمار"}</button>
        </div>
      </form>
    </div>
  );
}
