// Notice board (Aktualności). Date in ISO format (YYYY-MM-DD).

export type Notice = {
  date: string;
  text: string;
};

export const notices: Notice[] = [];
