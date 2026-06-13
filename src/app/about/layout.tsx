import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About the Creator",
  description:
    "Meet the elite Strength & Conditioning coach behind the Tennis Performance Development System™.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
