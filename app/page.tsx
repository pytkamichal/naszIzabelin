import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { VillageStats } from "@/components/VillageStats";
import { VillageHistory } from "@/components/VillageHistory";
import { Places } from "@/components/Places";
import { CalendarBoard } from "@/components/CalendarBoard";
import { Investments } from "@/components/Investments";
import { Transport } from "@/components/Transport";
import { Waste } from "@/components/Waste";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { village } from "@/data/village";

// Structured data for search engines. Describes the community site (WebSite)
// and the village itself (Place) — deliberately not a government/official org.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: `${village.name} – strona mieszkańców wsi`,
      inLanguage: "pl-PL",
      description: `Strona mieszkańców wsi ${village.name} (${village.region}).`,
    },
    {
      "@type": "Place",
      "@id": `${site.url}/#place`,
      name: village.name,
      description: `Niewielka wieś w gminie Jakubów (powiat miński, województwo mazowieckie).`,
      address: {
        "@type": "PostalAddress",
        addressLocality: village.name,
        addressRegion: "województwo mazowieckie",
        addressCountry: "PL",
      },
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "gmina Jakubów, powiat miński",
      },
      image: `${site.url}/opengraph-image`,
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <VillageStats />
        <VillageHistory />
        <Reveal>
          <Places />
        </Reveal>
        <Reveal>
          <CalendarBoard />
        </Reveal>
        <Reveal>
          <Investments />
        </Reveal>
        <Reveal>
          <Transport />
        </Reveal>
        <Reveal>
          <Waste />
        </Reveal>
        <Reveal>
          <Contacts />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
