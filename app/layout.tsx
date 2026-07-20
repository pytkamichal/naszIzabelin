import type { Metadata } from "next";
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

// Runs before paint on every load: reads the visitor's current month and marks
// <html> with the matching season so the theme changes over automatically with
// the calendar (meteorological seasons). Sep–Nov → autumn, Dec–Feb → winter,
// Mar–Aug → the default warm theme (attribute removed). Kept inline and tiny so
// it applies before the first paint — no flash of the wrong palette — and re-runs
// per request, so a statically cached page still shows the right season.
const seasonScript = `(function(){try{var m=new Date().getMonth(),s=m>=8&&m<=10?"autumn":(m===11||m<=1?"winter":"");var r=document.documentElement;if(s){r.setAttribute("data-season",s)}else{r.removeAttribute("data-season")}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${manrope.variable} ${fraunces.variable} ${geistMono.variable} ${cookie.variable} h-full antialiased`}
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
        <script dangerouslySetInnerHTML={{ __html: seasonScript }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
