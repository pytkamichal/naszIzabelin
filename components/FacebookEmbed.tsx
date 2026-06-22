type FacebookEmbedProps = {
  url: string;
  caption?: string;
};

export function FacebookEmbed({ url, caption }: FacebookEmbedProps) {
  if (!url) {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-graphite-600 bg-graphite-800 p-6 text-center">
        <span className="text-3xl" aria-hidden>
          ▶
        </span>
        <p className="text-sm font-medium text-zinc-300">
          [ Odtwarzacz wideo z Facebooka
          {caption ? ` – ${caption}` : ""} ]
        </p>
        <p className="text-xs text-zinc-500">
          Wklej adres URL filmu w pliku <code>data/protest.ts</code>{" "}
          (pole <code>facebookVideoUrl</code>), aby osadzić nagranie.
        </p>
      </div>
    );
  }

  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url,
  )}&show_text=false&width=560&t=0`;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg border border-graphite-600 bg-black">
      <iframe
        src={src}
        title={caption ?? "Wideo z Facebooka"}
        className="h-full w-full"
        style={{ border: "none" }}
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
