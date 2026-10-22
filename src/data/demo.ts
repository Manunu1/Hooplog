// Static fixtures only. No storage, authentication or live calculations.
export const player = {
  name: "Mateo",
  initials: "MT",
  sessions: 42,
  attempts: 1280,
  best: "64%",
};
export const lastSession = {
  name: "Tiros de la mañana",
  date: "12 oct 2026",
  attempts: 42,
  makes: 28,
  percentage: "67%",
};
export const activeSession = { attempts: 45, makes: 28, percentage: "62%" };
export const totals = { sessions: 42, attempts: 1280, percentage: "45%" };
export const history = [
  {
    id: "morning",
    name: "Tiros de la mañana",
    date: "12 OCT 2026",
    attempts: 42,
    percentage: "67%",
  },
  {
    id: "intensive",
    name: "Entrenamiento intensivo",
    date: "09 OCT 2026",
    attempts: 80,
    percentage: "38%",
  },
  {
    id: "free",
    name: "Práctica de tiro libre",
    date: "05 OCT 2026",
    attempts: 60,
    percentage: "60%",
  },
];
