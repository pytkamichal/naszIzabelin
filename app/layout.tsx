import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { village } from "@/data/village";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description = `Oficjalna strona mieszkańców wsi ${village.name} (powiat miński, woj. mazowieckie). Aktualności, kalendarz, inwestycje, kontakty oraz akcja STOP STREFIE 6SP.`;

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: `${village.name} – oficjalna strona mieszkańców wsi`,
    template: `%s · ${village.name}`,
  },
  description,
  keywords: [
    village.name,
    "wieś",
    "powiat miński",
    "Mazowsze",
    "strefa 6SP",
    "mieszkańcy",
  ],
  openGraph: {
    title: `${village.name} – oficjalna strona mieszkańców wsi`,
    description,
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white font-sans text-slate-900">
        {children}
      </body>
    </html>
  );
}
