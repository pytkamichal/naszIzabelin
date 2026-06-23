import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Alert6SP } from "@/components/Alert6SP";
import { VillageStats } from "@/components/VillageStats";
import { VillageHistory } from "@/components/VillageHistory";
import { Places } from "@/components/Places";
import { CalendarBoard } from "@/components/CalendarBoard";
import { Investments } from "@/components/Investments";
import { Transport } from "@/components/Transport";
import { Waste } from "@/components/Waste";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Alert6SP />
        <VillageStats />
        <VillageHistory />
        <Places />
        <CalendarBoard />
        <Investments />
        <Transport />
        <Waste />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
