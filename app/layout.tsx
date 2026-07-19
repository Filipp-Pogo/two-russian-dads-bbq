import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const barlow = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const plex = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const baseUrl = new URL(`${protocol}://${host}`);

  return {
    metadataBase: baseUrl,
    title: "Two Russian Dads BBQ | Mangal Catering in Greater Seattle",
    description:
      "Live-fire Armenian khorovats, shashlik, and traditional mangal catering for private parties, corporate events, and backyard gatherings across Greater Seattle.",
    keywords: [
      "Armenian barbecue catering",
      "mangal catering Seattle",
      "shashlik catering",
      "khorovats Seattle",
      "private event catering Seattle",
      "corporate event catering Seattle",
    ],
    applicationName: "Two Russian Dads BBQ",
    openGraph: {
      title: "Two Russian Dads BBQ — Laid Off. Fired Up.",
      description: "Armenian-rooted live-fire barbecue, family-table hospitality, and a seriously full table in your Greater Seattle backyard.",
      type: "website",
      locale: "en_US",
      url: baseUrl,
      images: [{ url: new URL("/og.png", baseUrl), width: 1200, height: 630, alt: "Two Russian Dads BBQ — Laid Off. Fired Up." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Two Russian Dads BBQ — Laid Off. Fired Up.",
      description: "Live-fire mangal catering for Greater Seattle gatherings.",
      images: [new URL("/og.png", baseUrl)],
    },
    robots: { index: false, follow: false },
    icons: { icon: "/favicon.ico", shortcut: "/favicon.ico" },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${barlow.variable} ${plex.variable}`}>{children}</body>
    </html>
  );
}
