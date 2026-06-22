// Bus timetable (BAGS operator).

export type BusLine = {
  line: string;
  times: string[];
};

export const transportProvider = "BAGS";

export const busLines: BusLine[] = [
  { line: "Linia 102", times: ["06:15", "08:30", "14:15", "17:40"] },
  { line: "Linia 105", times: ["07:00", "12:15", "16:00", "19:10"] },
];
