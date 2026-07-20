import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Fraunces, Geist_Mono, Cookie } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { village } from "@/data/village";
import { site } from "@/data/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Expressive display serif for headings — optical sizing gives small text a
// bookish warmth and large headlines a high-contrast editorial character.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  axes: ["opsz"],
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

const description = `Strona mieszkańców wsi ${village.name} (powiat miński, woj. mazowieckie). Aktualności, kalendarz, inwestycje i kontakty.`;

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
      className={`${manrope.variable} ${fraunces.variable} ${geistMono.variable} ${cookie.variable} h-full antialiased`}
      // The season script sets data-season on <html> before hydration, which
      // React can't know about — suppress the resulting attribute mismatch here.
      suppressHydrationWarning
    >
      {/* Browser extensions (password managers, security suites, etc.) often
          inject attributes like `bis_register` / `__processed_…` onto <body>
          before React hydrates, which triggers a hydration attribute mismatch.
          suppressHydrationWarning silences that noise for this element only;
          body content stays fully static. */}
      <body
        className="min-h-full flex flex-col bg-cream font-sans text-ink paper-grain relative"
        suppressHydrationWarning
      >
        {/* Sets data-season on <html> from the current month before the page
            becomes interactive — see public/season-init.js. External + before-
            Interactive so it runs per load (correct even for a cached page) and
            avoids rendering a <script> inside the React tree. */}
        <Script src="/season-init.js" strategy="beforeInteractive" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
