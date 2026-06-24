import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { village } from "@/data/village";

// Social-share card shown when the site is linked on Facebook, Messenger,
// WhatsApp, LinkedIn, etc. Generated at build time.
export const alt = `${village.name} – strona mieszkańców wsi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const eyebrow = "STRONA MIESZKAŃCÓW WSI";
const subtitle = "Strona mieszkańców";
const region = "gmina Jakubów · powiat miński · Mazowsze";

// Fetch a single weight of a Google font, subset to just the glyphs we render
// (keeps Polish diacritics crisp). Returns null if offline so the image still
// builds with the default font instead of failing.
async function loadGoogleFont(
  family: string,
  weight: number,
  text: string,
): Promise<ArrayBuffer | null> {
  try {
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
      family,
    )}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(
      /src: url\(([^)]+)\) format\('(?:opentype|truetype)'\)/,
    );
    if (!src) return null;
    const res = await fetch(src[1]);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const herb = await readFile(join(process.cwd(), "public/herb.png"), "base64");
  const herbSrc = `data:image/png;base64,${herb}`;

  const [bold, regular] = await Promise.all([
    loadGoogleFont("Inter", 700, `${eyebrow}${village.name}`),
    loadGoogleFont("Inter", 400, `${subtitle}${region}`),
  ]);

  const fonts = [
    bold && { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
    regular && { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
  ].filter(Boolean) as {
    name: string;
    data: ArrayBuffer;
    weight: 400 | 700;
    style: "normal";
  }[];

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", fontFamily: "Inter" }}>
        {/* Emblem panel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 440,
            background: "#f4f2ec",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={herbSrc} alt="" height={400} />
        </div>

        {/* Text panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            padding: "0 70px",
            background: "linear-gradient(135deg, #1e3f30 0%, #2f6248 100%)",
            color: "#faf9f5",
          }}
        >
          <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: 4, color: "#93b9a1" }}>
            {eyebrow}
          </div>
          <div style={{ fontSize: 128, fontWeight: 700, lineHeight: 1, marginTop: 12 }}>
            {village.name}
          </div>
          <div style={{ fontSize: 42, fontWeight: 400, marginTop: 16, color: "#deeae1" }}>
            {subtitle}
          </div>
          <div style={{ width: 90, height: 4, background: "#649a7b", margin: "36px 0" }} />
          <div style={{ fontSize: 26, fontWeight: 400, color: "#bdd5c5" }}>{region}</div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
