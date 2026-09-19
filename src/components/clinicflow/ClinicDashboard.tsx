"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { DemoAppointment, DemoPatient } from "@/lib/server/demo-store";

type Section = "dashboard" | "patients" | "appointments" | "treatments" | "billing";
type PatientFormResult = Pick<DemoPatient, "id" | "name" | "phone" | "service" | "status">;

const fallbackPatients: DemoPatient[] = [
  { id: "p-1", name: "Sarah Mitchell", phone: "+1 202 555 0142", service: "Facial consultation", status: "Active" },
  { id: "p-2", name: "Emma Carter", phone: "+1 202 555 0188", service: "Skin treatment", status: "Follow-up" },
  { id: "p-3", name: "Olivia Brown", phone: "+1 202 555 0129", service: "Botox consultation", status: "New" },
  { id: "p-4", name: "Mia Wilson", phone: "+1 202 555 0175", service: "Laser session", status: "Active" },
];

const fallbackAppointments: DemoAppointment[] = [
  { id: "a-1", time: "09:30", patient: "Sarah Mitchell", doctor: "Dr. A. Rahimi", service: "Consultation", status: "Confirmed" },
  { id: "a-2", time: "10:15", patient: "Emma Carter", doctor: "Dr. A. Rahimi", service: "Skin treatment", status: "Waiting" },
  { id: "a-3", time: "11:00", patient: "Olivia Brown", doctor: "Dr. N. Smith", service: "Botox consultation", status: "Confirmed" },
  { id: "a-4", time: "13:30", patient: "Mia Wilson", doctor: "Dr. N. Smith", service: "Laser session", status: "Completed" },
];

export function ClinicDashboard({ section }: { section: Section }) {
  if (section === "patients") return <Patients />;
  if (section === "appointments") return <Appointments />;
  if (section === "treatments") {
    return (
      <Module
        title="Treatments"
        eyebrow="Clinical workflow"
        description="Treatment plans, procedures and follow-up tracking in one patient-centered workflow."
        stats={["18 active plans", "7 follow-ups", "3 awaiting approval"]}
      />
    );
  }
  if (section === "billing") {
    return (
      <Module
        title="Billing"
        eyebrow="Revenue operations"
        description="Invoices, payments and outstanding balances with a clinic-scoped financial view."
        stats={["$12,480 collected", "$3,240 outstanding", "18 open invoices"]}
      />
    );
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
      .then((result) => {
        if (!cancelled && result.data) setItems(result.data);
      })
      .catch(() => {
        if (!cancelled) setError("Live demo data could not be loaded. Showing sample data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { items, setItems, loading, error };
}

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const { items, loading, error } = useDemoAppointments();

  return (
    <div className="space-y-7">
      <header>
        <p className="text-sm font-semibold text-[var(--brand)]">Today at Aida Clinic</p>
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good morning, clinic team.</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">The operational picture at a glance.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white"
          >
            + New patient
          </button>
        </div>
      </header>

      {error && <Notice>{error}</Notice>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Patients" value="248" note="+12 this month" />
        <Metric label="Appointments" value="18" note="4 remaining today" />
        <Metric label="Outstanding" value="$3,240" note="18 open invoices" />
        <Metric label="Revenue" value="$12,480" note="+8.4% this month" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold">Today&apos;s schedule</h2>
              <p className="mt-1 text-xs text-[var(--muted)]">Live operational queue</p>
            </div>
            <Link href="/appointments" className="text-sm font-medium text-[var(--brand)]">
              View calendar →
            </Link>
          </div>

          <div className="mt-5 divide-y divide-[var(--border)]">
            {loading ? (
              <p className="py-6 text-sm text-[var(--muted)]">Loading schedule…</p>
            ) : (
              items.map((appointment) => (
                <div key={appointment.id} className="grid grid-cols-[70px_1fr_auto] items-center gap-4 py-4">
                  <b>{appointment.time}</b>
                  <div>
                    <p className="text-sm font-medium">{appointment.patient}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {appointment.service} · {appointment.doctor}
                    </p>
                  </div>
                  <Status value={appointment.status} />
                </div>
              ))
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
          <h2 className="font-semibold">Quick actions</h2>
          <div className="mt-4 grid gap-3">
            <button type="button" onClick={() => setShowForm(true)} className="action-card">
              <p className="text-sm font-semibold">Register patient</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Create a new patient record</p>
            </button>
            <Link href="/appointments" className="action-card">
              <p className="text-sm font-semibold">Book appointment</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Find the next available slot</p>
            </Link>
            <Link href="/invoices" className="action-card">
              <p className="text-sm font-semibold">Create invoice</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Turn a treatment into a bill</p>
            </Link>
            <Link href="/patients" className="action-card">
              <p className="text-sm font-semibold">Patient 360</p>
              <p className="mt-1 text-xs text-[var(--muted)]">Open the complete patient timeline</p>
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
      .then((result) => {
        if (!cancelled && result.data) setItems(result.data);
      })
      .catch(() => {
        if (!cancelled) setError("Live demo data could not be loaded. Showing sample data.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () =>
      items.filter((patient) =>
        [patient.name, patient.phone, patient.service].join(" ").toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[var(--brand)]">Patient 360</p>
          <h1 className="mt-1 text-3xl font-bold">Patients</h1>
          <p className="mt-2 text-sm text-[var(--muted)]">One operational record for every patient.</p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white"
        >
          + New patient
        </button>
      </header>

      {error && <Notice>{error}</Notice>}

      <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
        <div className="border-b border-[var(--border)] p-4">
          <label htmlFor="patient-search" className="sr-only">
            Search patients, phone or treatment
          </label>
          <input
            id="patient-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search patients, phone or treatment…"
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Clinic patients</caption>
            <thead className="bg-[var(--background)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th scope="col" className="px-5 py-3">Patient</th>
                <th scope="col" className="px-5 py-3">Phone</th>
                <th scope="col" className="px-5 py-3">Latest service</th>
                <th scope="col" className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-[var(--muted)]">Loading patients…</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-8 text-center text-sm text-[var(--muted)]">No patients match your search.</td>
                </tr>
              ) : (
                filtered.map((patient) => (
                  <tr key={patient.id} className="hover:bg-[var(--background)]">
                    <td className="px-5 py-4 font-medium">{patient.name}</td>
                    <td className="px-5 py-4 text-[var(--muted)]">{patient.phone || "—"}</td>
                    <td className="px-5 py-4">{patient.service || "General consultation"}</td>
                    <td className="px-5 py-4"><Status value={patient.status} /></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showForm && (
        <PatientForm
          onClose={() => setShowForm(false)}
          onCreated={(patient) => setItems((current) => [patient, ...current])}
        />
      )}
    </div>
  );
}

function Appointments() {
  const { items, setItems, loading, error } = useDemoAppointments();
  const [savingId, setSavingId] = useState<string | null>(null);

  async function updateStatus(id: string, status: DemoAppointment["status"]) {
    setSavingId(id);

    try {
      const response = await fetch("/api/demo/appointments", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (!response.ok) throw new Error("appointment-update-failed");

      const result = (await response.json()) as { data: DemoAppointment };
      setItems((current) => current.map((item) => (item.id === id ? result.data : item)));
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-[var(--brand)]">Scheduling</p>
        <h1 className="mt-1 text-3xl font-bold">Appointments</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Keep the front desk, providers and patient flow synchronized.
        </p>
      </header>

      {error && <Notice>{error}</Notice>}

      <div className="grid gap-4 sm:grid-cols-3">
        <Metric label="Today" value="18" note="4 remaining" />
        <Metric label="Confirmed" value="14" note="78% of schedule" />
        <Metric label="Waiting" value="2" note="Needs attention" />
      </div>

      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
        <div className="divide-y divide-[var(--border)]">
          {loading ? (
            <p className="py-6 text-sm text-[var(--muted)]">Loading appointments…</p>
          ) : (
            items.map((appointment) => (
              <div key={appointment.id} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex items-center gap-5">
                  <b className="w-14">{appointment.time}</b>
                  <div>
                    <p className="font-medium">{appointment.patient}</p>
                    <p className="mt-1 text-xs text-[var(--muted)]">
                      {appointment.service} · {appointment.doctor}
                    </p>
                  </div>
                </div>

                <label className="sr-only" htmlFor={`appointment-status-${appointment.id}`}>
                  Status for {appointment.patient}
                </label>
                <select
                  id={`appointment-status-${appointment.id}`}
                  aria-label={`Status for ${appointment.patient}`}
                  disabled={savingId === appointment.id}
                  value={appointment.status}
                  onChange={(event) => void updateStatus(appointment.id, event.target.value as DemoAppointment["status"])}
                  className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs disabled:opacity-60"
                >
                  <option>Confirmed</option>
                  <option>Waiting</option>
                  <option>Completed</option>
                </select>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function Module({
  title,
  eyebrow,
  description,
  stats,
}: {
  title: string;
  eyebrow: string;
  description: string;
  stats: string[];
}) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-[var(--brand)]">{eyebrow}</p>
        <h1 className="mt-1 text-3xl font-bold">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p>
      </header>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm">
            <p className="text-lg font-semibold">{stat}</p>
            <p className="mt-2 text-xs text-[var(--muted)]">Clinic-scoped operational metric</p>
          </article>
        ))}
      </div>
      <article className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8">
        <h2 className="font-semibold">Service boundary ready</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">
          This UI contract is intentionally separated from the domain model so the owning backend service can be connected without moving business logic into the page.
        </p>
      </article>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
      <p className="mt-2 text-xs text-[var(--muted)]">{note}</p>
    </article>
  );
}

function Status({ value }: { value: string }) {
  return <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium">{value}</span>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">
      {children}
    </div>
  );
}

function PatientForm({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated?: (patient: PatientFormResult) => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("General consultation");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/demo/patients", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, phone, service }),
      });

      const result = (await response.json().catch(() => null)) as { data?: PatientFormResult; error?: string } | null;

      if (response.status === 409) {
        setError("A patient with this phone number already exists.");
        return;
      }

      if (!response.ok || !result?.data) {
        setError("Could not create patient. Check the entered details and try again.");
        return;
      }

      onCreated?.(result.data);
      onClose();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-patient-title"
        className="w-full max-w-md rounded-2xl bg-[var(--surface)] p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="new-patient-title" className="text-lg font-semibold">New patient</h2>
            <p className="mt-1 text-xs text-[var(--muted)]">Demo workflow; persistence remains behind the service boundary.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close dialog" className="rounded-lg border border-[var(--border)] px-2 py-1 text-sm">
            ×
          </button>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="patient-name" className="text-sm font-medium">Full name</label>
            <input
              id="patient-name"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              required
              minLength={2}
              maxLength={120}
              className="mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
            />
          </div>
          <div>
            <label htmlFor="patient-phone" className="text-sm font-medium">Phone</label>
            <input
              id="patient-phone"
              name="phone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              autoComplete="tel"
              maxLength={32}
              className="mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
            />
          </div>
          <div>
            <label htmlFor="patient-service" className="text-sm font-medium">Initial service</label>
            <input
              id="patient-service"
              name="service"
              value={service}
              onChange={(event) => setService(event.target.value)}
              maxLength={120}
              className="mt-1 w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]"
            />
          </div>
        </div>

        {error && <p role="alert" className="mt-3 text-sm text-[var(--danger)]">{error}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm">
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
          >
            {saving ? "Creating…" : "Create patient"}
          </button>
        </div>
      </form>
    </div>
  );
}
