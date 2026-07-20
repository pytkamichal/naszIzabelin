import { site } from "@/data/site";
import { village } from "@/data/village";
import { SuggestionForm } from "./SuggestionForm";
import { BuyMeACoffee } from "./ui/BuyMeACoffee";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="kontakt"
      className="grain relative z-10 mt-auto overflow-hidden bg-pine-950 text-cream/80"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60% 50% at 80% 0%, rgba(227,174,53,0.06), transparent 70%), radial-gradient(55% 60% at 15% 100%, rgba(58,125,85,0.15), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-5">
        <div className="grid gap-14 lg:grid-cols-2">
          {/* Suggestion form */}
          <div>
            <h2 className="font-serif text-4xl font-semibold tracking-tight text-cream">
              Masz pomysł na rozwój strony
              <span aria-hidden className="text-gold-400">
                ?
              </span>
            </h2>
            <p className="mt-3 max-w-md leading-relaxed text-cream/60">
              Napisz do nas — czytamy wszystkie zgłoszenia i wspólnie rozwijamy
              tę stronę.
            </p>
            <div className="mt-7 max-w-md">
              <SuggestionForm />
            </div>
          </div>

          {/* About */}
          <div className="lg:pl-10">
            <img
              src="/logo.jpeg"
              alt={site.name}
              className="h-16 w-auto rounded-xl"
            />
            <p className="mt-4 max-w-md leading-relaxed text-cream/60">
              Strona mieszkańców wsi {village.name} ({village.region}).
              Tworzona społecznie, dla naszej lokalnej społeczności.
            </p>
            <BuyMeACoffee className="mt-7" label="Buy me a coffee / Wesprzyj" />
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6 text-sm text-cream/40">
          <p>
            © {year} Michał Pytka. Strona stworzona społecznie dla
            mieszkańców wsi {village.name}. Wspieraj projekt przez{" "}
            <a
              href={site.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-gold-300 hover:underline"
            >
              Buy me a coffee
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
