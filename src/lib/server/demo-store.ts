export type DemoPatient = {
  id: string;
  name: string;
  phone: string;
  service: string;
  status: "Active" | "Follow-up" | "New";
};

export type DemoAppointment = {
  id: string;
  time: string;
  patient: string;
  doctor: string;
  service: string;
  status: "Confirmed" | "Waiting" | "Completed";
};

const seedPatients: DemoPatient[] = [
  { id: "p-1", name: "سارا محمدی", phone: "۰۹۱۲ ۲۰۲ ۰۱۴۲", service: "مشاوره پوست", status: "Active" },
  { id: "p-2", name: "النا کریمی", phone: "۰۹۱۲ ۲۰۲ ۰۱۸۸", service: "جوان‌سازی پوست", status: "Follow-up" },
  { id: "p-3", name: "مریم حسینی", phone: "۰۹۱۲ ۲۰۲ ۰۱۲۹", service: "مشاوره بوتاکس", status: "New" },
  { id: "p-4", name: "نرگس رضایی", phone: "۰۹۱۲ ۲۰۲ ۰۱۷۵", service: "جلسه لیزر", status: "Active" },
];

const seedAppointments: DemoAppointment[] = [
  { id: "a-1", time: "09:30", patient: "سارا محمدی", doctor: "دکتر رحیمی", service: "مشاوره پوست", status: "Confirmed" },
  { id: "a-2", time: "10:15", patient: "النا کریمی", doctor: "دکتر رحیمی", service: "جوان‌سازی پوست", status: "Waiting" },
  { id: "a-3", time: "11:00", patient: "مریم حسینی", doctor: "دکتر نادری", service: "مشاوره بوتاکس", status: "Confirmed" },
  { id: "a-4", time: "13:30", patient: "نرگس رضایی", doctor: "دکتر نادری", service: "جلسه لیزر", status: "Completed" },
];

type ClinicFlowDemoState = {
  patients: DemoPatient[];
  appointments: DemoAppointment[];
};

const globalStore = globalThis as typeof globalThis & {
  __clinicFlowDemo?: ClinicFlowDemoState;
};

function getStore(): ClinicFlowDemoState {
  globalStore.__clinicFlowDemo ??= {
    patients: structuredClone(seedPatients),
    appointments: structuredClone(seedAppointments),
  };
  return globalStore.__clinicFlowDemo;
}

export function listDemoPatients(query = "") {
  const normalized = query.trim().toLowerCase();
  return getStore().patients.filter((patient) =>
    normalized.length === 0
      ? true
      : [patient.name, patient.phone, patient.service].join(" ").toLowerCase().includes(normalized),
  );
}

export function createDemoPatient(input: Pick<DemoPatient, "name" | "phone" | "service">) {
  const store = getStore();
  const phone = input.phone.trim();

  if (phone && store.patients.some((patient) => patient.phone === phone)) {
    return { conflict: true as const };
  }

  const patient: DemoPatient = {
    id: "p-" + crypto.randomUUID(),
    name: input.name.trim(),
    phone,
    service: input.service.trim(),
    status: "New",
  };

  store.patients.unshift(patient);
  return { conflict: false as const, patient };
}

export function listDemoAppointments() {
  return structuredClone(getStore().appointments);
}

export function updateDemoAppointment(id: string, status: DemoAppointment["status"]) {
  const store = getStore();
  const appointment = store.appointments.find((item) => item.id === id);

  if (!appointment) return null;

  appointment.status = status;
  return structuredClone(appointment);
}
