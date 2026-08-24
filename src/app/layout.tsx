import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SiteMediaProvider } from "@/components/providers/SiteMediaProvider";
import { getSiteMedia } from "@/lib/site-media";
import { BRAND } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.systemName} | Elite Junior Tennis Physical Development`,
    template: `%s | ${BRAND.systemShort}`,
  },
  description: BRAND.usp,
  keywords: [
    "tennis performance development system",
    "junior tennis physical development",
    "tennis strength conditioning",
    "junior tennis training system",
    "tennis coach education",
    "long-term athlete development tennis",
  ],
  openGraph: {
    title: BRAND.systemName,
    description: BRAND.usp,
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const media = await getSiteMedia();

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body className="font-sans">
        <SiteMediaProvider media={media}>
          <SiteChrome>{children}</SiteChrome>
        </SiteMediaProvider>
      </body>
    </html>
  );
}
