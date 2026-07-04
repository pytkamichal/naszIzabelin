import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Alert6SP } from "@/components/Alert6SP";
import { Footer } from "@/components/Footer";
import { protest } from "@/data/protest";

export const metadata: Metadata = {
  title: protest.navLabel,
  description: protest.lead,
  alternates: {
    canonical: "/strefa-6sp",
  },
};

export default function Strefa6SPPage() {
  return (
    <>
      <Header />
      {/* Graphite backdrop from the very top, so the fixed glass header
          floats over the same dark canvas as the protest section. */}
      <main className="flex-1 bg-graphite pt-32">
        <div className="mx-auto max-w-6xl px-4 pb-2 sm:px-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-zinc-200"
          >
            <span aria-hidden>←</span>
            Wróć na stronę główną
          </Link>
        </div>
        <Alert6SP />
      </main>
      <Footer />
    </>
  );
}
