export type DemoPatient = {
  id: string;
  name: string;
  phone: string;
  service: string;
  status: "Active" | "Follow-up" | "New";
};

export type DemoAppointment = {
  time: string;
  patient: string;
  doctor: string;
  service: string;
  status: "Confirmed" | "Waiting" | "Completed";
};

const seedPatients: DemoPatient[] = [
  { id: "p-1", name: "Sarah Mitchell", phone: "+1 202 555 0142", service: "Facial consultation", status: "Active" },
  { id: "p-2", name: "Emma Carter", phone: "+1 202 555 0188", service: "Skin treatment", status: "Follow-up" },
  { id: "p-3", name: "Olivia Brown", phone: "+1 202 555 0129", service: "Botox consultation", status: "New" },
  { id: "p-4", name: "Mia Wilson", phone: "+1 202 555 0175", service: "Laser session", status: "Active" },
];

const seedAppointments: DemoAppointment[] = [
  { time: "09:30", patient: "Sarah Mitchell", doctor: "Dr. A. Rahimi", service: "Consultation", status: "Confirmed" },
  { time: "10:15", patient: "Emma Carter", doctor: "Dr. A. Rahimi", service: "Skin treatment", status: "Waiting" },
  { time: "11:00", patient: "Olivia Brown", doctor: "Dr. N. Smith", service: "Botox consultation", status: "Confirmed" },
  { time: "13:30", patient: "Mia Wilson", doctor: "Dr. N. Smith", service: "Laser session", status: "Completed" },
];

type ClinicFlowDemoState = {
  patients: DemoPatient[];
  appointments: DemoAppointment[];
};

const globalStore = globalThis as typeof globalThis & { __clinicFlowDemo?: ClinicFlowDemoState };

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
  if (input.phone.trim() && store.patients.some((patient) => patient.phone === input.phone.trim())) {
    return { conflict: true as const };
  }
  const patient: DemoPatient = {
    id: "p-" + crypto.randomUUID(),
    name: input.name.trim(),
    phone: input.phone.trim(),
    service: input.service.trim(),
    status: "New",
  };
  store.patients.unshift(patient);
  return { conflict: false as const, patient };
}

export function listDemoAppointments() {
  return getStore().appointments;
}

export function updateDemoAppointment(index: number, status: DemoAppointment["status"]) {
  const store = getStore();
  const appointment = store.appointments[index];
  if (!appointment) return null;
  appointment.status = status;
  return appointment;
}
