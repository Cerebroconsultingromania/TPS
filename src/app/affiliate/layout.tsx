import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner Program",
  description:
    "Join the affiliate and partnership program for the Tennis Performance Development System™.",
};

export default function AffiliateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
