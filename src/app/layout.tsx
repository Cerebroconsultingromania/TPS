import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollSceneWrapper } from "@/components/layout/ScrollSceneWrapper";
import { BRAND } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="font-sans">
        <ScrollSceneWrapper />
        <Navbar />
        <main className="relative z-[2] isolate">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
