// Notice board (Aktualności). Date in ISO format (YYYY-MM-DD).

export type Notice = {
  date: string;
  text: string;
};

export const notices: Notice[] = [
  {
    date: "2026-06-20",
    text: "Informacja o planowanej przerwie w dostawie prądu.",
  },
  {
    date: "2026-06-18",
    text: "Wyniki zbiórki charytatywnej z festynu wiejskiego.",
  },
];
