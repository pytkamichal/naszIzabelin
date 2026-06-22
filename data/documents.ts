// Downloadable documents (6SP section). Put the files in /public/docs/.

export type DocItem = {
  label: string;
  href: string;
  type: "PDF" | "DOCX";
};

export const documents: DocItem[] = [
  {
    label: "Petycja przeciwko strefie 6SP",
    href: "/docs/petycja-6sp.pdf",
    type: "PDF",
  },
  {
    label: "Oficjalny protest mieszkańców do Gminy",
    href: "/docs/protest-mieszkancow.docx",
    type: "DOCX",
  },
];
