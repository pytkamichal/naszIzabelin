import type { Metadata } from "next";
import { Inter, Lora, Geist_Mono, Cookie } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { village } from "@/data/village";
import { site } from "@/data/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Editorial serif for headings — gives the page a calm, civic, institutional
// voice instead of the all-sans "startup" look.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Cursive face used only for the "Buy me a coffee" button lettering.
const cookie = Cookie({
  weight: "400",
  variable: "--font-cookie",
  subsets: ["latin"],
  display: "swap",
});

const description = `Strona mieszkańców wsi ${village.name} (powiat miński, woj. mazowieckie). Aktualności, kalendarz, inwestycje, kontakty oraz akcja STOP STREFIE 6SP.`;

const title = `${village.name} – strona mieszkańców wsi`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    siteName: `${village.name} – strona mieszkańców`,
    url: site.url,
    locale: "pl_PL",
    type: "website",
    // The share image is supplied by app/opengraph-image.tsx (file convention).
  },
  twitter: {
    // Falls back to the Open Graph image; renders a large preview card.
    card: "summary_large_image",
    title,
    description,
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
      className={`${inter.variable} ${lora.variable} ${geistMono.variable} ${cookie.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas font-sans text-slate-900">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
