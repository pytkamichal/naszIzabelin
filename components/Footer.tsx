import { site } from "@/data/site";
import { village } from "@/data/village";
import { SuggestionForm } from "./SuggestionForm";
import { BuyMeACoffee } from "./ui/BuyMeACoffee";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="kontakt" className="mt-auto bg-graphite text-zinc-300">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Suggestion form */}
          <div>
            <h2 className="font-serif text-3xl font-semibold text-white">
              Masz pomysł na rozwój strony?
            </h2>
            <p className="mt-2 max-w-md text-zinc-400">
              Napisz do nas — czytamy wszystkie zgłoszenia i wspólnie rozwijamy
              tę stronę.
            </p>
            <div className="mt-6 max-w-md">
              <SuggestionForm />
            </div>
          </div>

          {/* About */}
          <div className="lg:pl-10">
            <img
              src="/logo.jpeg"
              alt={site.name}
              className="h-16 w-auto"
            />
            <p className="mt-3 max-w-md text-zinc-400">
              Oficjalna strona mieszkańców wsi {village.name} ({village.region}).
              Tworzona społecznie, dla naszej lokalnej społeczności.
            </p>
            <BuyMeACoffee className="mt-6" label="Buy me a coffee / Wesprzyj" />
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-zinc-500">
          <p>
            © {year} Michał Pytka. Strona stworzona społecznie dla
            mieszkańców wsi {village.name}. Wspieraj projekt przez{" "}
            <a
              href={site.buyMeACoffeeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-amber-300 hover:underline"
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
