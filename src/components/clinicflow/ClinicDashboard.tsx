"use client";

import { useEffect, useMemo, useState } from "react";

const patients = [
  { id: 1, name: "Sarah Mitchell", phone: "+1 202 555 0142", service: "Facial consultation", status: "Active" },
  { id: 2, name: "Emma Carter", phone: "+1 202 555 0188", service: "Skin treatment", status: "Follow-up" },
  { id: 3, name: "Olivia Brown", phone: "+1 202 555 0129", service: "Botox consultation", status: "New" },
  { id: 4, name: "Mia Wilson", phone: "+1 202 555 0175", service: "Laser session", status: "Active" },
];
const appointments = [
  { time: "09:30", patient: "Sarah Mitchell", doctor: "Dr. A. Rahimi", service: "Consultation", status: "Confirmed" },
  { time: "10:15", patient: "Emma Carter", doctor: "Dr. A. Rahimi", service: "Skin treatment", status: "Waiting" },
  { time: "11:00", patient: "Olivia Brown", doctor: "Dr. N. Smith", service: "Botox consultation", status: "Confirmed" },
  { time: "13:30", patient: "Mia Wilson", doctor: "Dr. N. Smith", service: "Laser session", status: "Completed" },
];
type Section = "dashboard" | "patients" | "appointments" | "treatments" | "billing";

export function ClinicDashboard({ section }: { section: Section }) {
  if (section === "patients") return <Patients />;
  if (section === "appointments") return <Appointments />;
  if (section === "treatments") return <Module title="Treatments" eyebrow="Clinical workflow" description="Treatment plans, procedures and follow-up tracking in one patient-centered workflow." stats={["18 active plans", "7 follow-ups", "3 awaiting approval"]} />;
  if (section === "billing") return <Module title="Billing" eyebrow="Revenue operations" description="Invoices, payments and outstanding balances with a clinic-scoped financial view." stats={["$12,480 collected", "$3,240 outstanding", "18 open invoices"]} />;
  return <Dashboard />;
}
function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  return <div className="space-y-7">
    <header><p className="text-sm font-semibold text-[var(--brand)]">Today at Aida Clinic</p><div className="mt-1 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight">Good morning, clinic team.</h1><p className="mt-2 text-sm text-[var(--muted)]">The operational picture at a glance.</p></div><button onClick={() => setShowForm(true)} className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white">+ New patient</button></div></header>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Patients" value="248" note="+12 this month" /><Metric label="Appointments" value="18" note="4 remaining today" /><Metric label="Outstanding" value="$3,240" note="18 open invoices" /><Metric label="Revenue" value="$12,480" note="+8.4% this month" /></div>
    <div className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><div className="flex items-center justify-between"><div><h2 className="font-semibold">Today&apos;s schedule</h2><p className="mt-1 text-xs text-[var(--muted)]">Live operational queue</p></div><a href="/appointments" className="text-sm font-medium text-[var(--brand)]">View calendar →</a></div><div className="mt-5 divide-y divide-[var(--border)]">{appointments.map(a => <div key={a.time} className="grid grid-cols-[70px_1fr_auto] items-center gap-4 py-4"><b>{a.time}</b><div><p className="text-sm font-medium">{a.patient}</p><p className="mt-1 text-xs text-[var(--muted)]">{a.service} · {a.doctor}</p></div><Status value={a.status} /></div>)}</div></section>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><h2 className="font-semibold">Quick actions</h2><div className="mt-4 grid gap-3">{[["Register patient","Create a new patient record"],["Book appointment","Find the next available slot"],["Create invoice","Turn a treatment into a bill"],["Patient 360","Open the complete timeline"]].map(([a,b]) => <button key={a} className="rounded-xl border border-[var(--border)] p-4 text-left hover:border-[var(--brand)]"><p className="text-sm font-semibold">{a}</p><p className="mt-1 text-xs text-[var(--muted)]">{b}</p></button>)}</div></section>
    </div>
    {showForm && <PatientForm onClose={() => setShowForm(false)} />}
  </div>;
}
function Patients() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState(patients);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => { fetch("/api/demo/patients").then(r => r.ok ? r.json() : Promise.reject(r)).then(r => setItems(r.data)).catch(() => undefined); }, []);
  const filtered = useMemo(() => items.filter(p => [p.name,p.phone,p.service].join(" ").toLowerCase().includes(query.toLowerCase())), [items, query]);
  return <div className="space-y-6"><header className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-[var(--brand)]">Patient 360</p><h1 className="mt-1 text-3xl font-bold">Patients</h1><p className="mt-2 text-sm text-[var(--muted)]">One operational record for every patient.</p></div><button onClick={() => setShowForm(true)} className="rounded-xl bg-[var(--brand)] px-4 py-2.5 text-sm font-semibold text-white">+ New patient</button></header><section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"><div className="border-b border-[var(--border)] p-4"><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search patients, phone or treatment…" className="w-full rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-2.5 text-sm outline-none focus:border-[var(--brand)]" /></div><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="bg-[var(--background)] text-xs uppercase tracking-wide text-[var(--muted)]"><tr><th className="px-5 py-3">Patient</th><th className="px-5 py-3">Phone</th><th className="px-5 py-3">Latest service</th><th className="px-5 py-3">Status</th></tr></thead><tbody className="divide-y divide-[var(--border)]">{filtered.map(p => <tr key={p.id} className="hover:bg-[var(--background)]"><td className="px-5 py-4 font-medium">{p.name}</td><td className="px-5 py-4 text-[var(--muted)]">{p.phone}</td><td className="px-5 py-4">{p.service}</td><td className="px-5 py-4"><Status value={p.status} /></td></tr>)}</tbody></table></div></section>{showForm && <PatientForm onClose={() => setShowForm(false)} onCreated={(patient) => setItems((current) => [patient, ...current])} />}</div>;
}
function Appointments() {
  const [items, setItems] = useState(appointments);
  useEffect(() => { fetch("/api/demo/appointments").then(r => r.ok ? r.json() : Promise.reject(r)).then(r => setItems(r.data)).catch(() => undefined); }, []);
  async function updateStatus(index: number, status: string) {
    const response = await fetch("/api/demo/appointments", { method: "PATCH", headers: { "content-type": "application/json" }, body: JSON.stringify({ index, status }) });
    if (!response.ok) return;
    const result = await response.json();
    setItems(current => current.map((item, i) => i === index ? result.data : item));
  }
  return <div className="space-y-6"><header><p className="text-sm font-semibold text-[var(--brand)]">Scheduling</p><h1 className="mt-1 text-3xl font-bold">Appointments</h1><p className="mt-2 text-sm text-[var(--muted)]">Keep the front desk, providers and patient flow synchronized.</p></header><div className="grid gap-4 sm:grid-cols-3"><Metric label="Today" value="18" note="4 remaining" /><Metric label="Confirmed" value="14" note="78% of schedule" /><Metric label="Waiting" value="2" note="Needs attention" /></div><section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><div className="divide-y divide-[var(--border)]">{items.map((a,i) => <div key={a.time} className="flex flex-wrap items-center justify-between gap-4 py-4"><div className="flex items-center gap-5"><b className="w-14">{a.time}</b><div><p className="font-medium">{a.patient}</p><p className="mt-1 text-xs text-[var(--muted)]">{a.service} · {a.doctor}</p></div></div><select value={a.status} onChange={e => void updateStatus(i, e.target.value)} className="rounded-lg border border-[var(--border)] px-3 py-2 text-xs"><option>Confirmed</option><option>Waiting</option><option>Completed</option></select></div>)}</div></section></div>;
}
function Module({title,eyebrow,description,stats}:{title:string;eyebrow:string;description:string;stats:string[]}) {
  return <div className="space-y-6"><header><p className="text-sm font-semibold text-[var(--brand)]">{eyebrow}</p><h1 className="mt-1 text-3xl font-bold">{title}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{description}</p></header><div className="grid gap-4 md:grid-cols-3">{stats.map(s => <article key={s} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm"><p className="text-lg font-semibold">{s}</p><p className="mt-2 text-xs text-[var(--muted)]">Clinic-scoped operational metric</p></article>)}</div><article className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] p-8"><h2 className="font-semibold">Service boundary ready</h2><p className="mt-2 max-w-xl text-sm leading-6 text-[var(--muted)]">This UI contract is intentionally separated from the domain model so the owning backend service can be connected without moving business logic into the page.</p></article></div>;
}
function Metric({label,value,note}:{label:string;value:string;note:string}) { return <article className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"><p className="text-sm text-[var(--muted)]">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p><p className="mt-2 text-xs text-[var(--muted)]">{note}</p></article>; }
function Status({value}:{value:string}) { return <span className="rounded-full border border-[var(--border)] px-2.5 py-1 text-xs font-medium">{value}</span>; }
function PatientForm({onClose,onCreated}:{onClose:()=>void;onCreated?:(patient:{id:string;name:string;phone:string;service:string;status:"Active"|"Follow-up"|"New"})=>void}) {
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [service,setService]=useState("");
  const [saving,setSaving]=useState(false);
  const [error,setError]=useState("");
  async function submit() {
    setSaving(true); setError("");
    const response = await fetch("/api/demo/patients", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name, phone, service }) });
    if (response.status === 409) { setError("A patient with this phone number already exists."); setSaving(false); return; }
    if (!response.ok) { setError("Could not create patient."); setSaving(false); return; }
    const result = await response.json();
    onCreated?.(result.data);
    onClose();
  }
  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4"><div className="w-full max-w-md rounded-2xl bg-[var(--surface)] p-6 shadow-xl"><h2 className="text-lg font-semibold">New patient</h2><p className="mt-1 text-xs text-[var(--muted)]">Demo workflow; persistence is the next service integration gate.</p><div className="mt-5 space-y-3"><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" /><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" /><input value={service} onChange={e=>setService(e.target.value)} placeholder="Initial service" className="w-full rounded-xl border border-[var(--border)] px-4 py-3 text-sm outline-none focus:border-[var(--brand)]" /></div>{error && <p className="mt-3 text-sm text-[var(--danger)]">{error}</p>}<div className="mt-5 flex justify-end gap-2"><button onClick={onClose} className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm">Cancel</button><button disabled={!name.trim() || saving} onClick={() => void submit()} className="rounded-xl bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">{saving ? "Creating…" : "Create patient"}</button></div></div></div>; }
