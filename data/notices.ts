// Notice board (Aktualności). Date in ISO format (YYYY-MM-DD).

export type Notice = {
  date: string;
  text: string;
};

export const notices: Notice[] = [
  {
    date: "2026-07-07",
    text: "Inkasent gminny — opłata za wodę. Inkasent gminny odwiedzi mieszkańców w sprawie opłaty za wodę. Prosimy o przygotowanie należności.",
  },
];
