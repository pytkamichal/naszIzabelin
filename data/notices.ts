// Notice board (Aktualności). Date in ISO format (YYYY-MM-DD).

export type Notice = {
  date: string;
  text: string;
};

export const notices: Notice[] = [
  {
    date: "2026-07-29",
    text: "Inspekcja kominiarska dla zainteresowanych - więcej informacji u Sołtysa lub na grupie Messenger",
  },
];
