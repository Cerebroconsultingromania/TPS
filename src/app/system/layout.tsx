import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Complete System",
  description:
    "Invest in the Tennis Performance Development System™ — a complete physical development framework for competitive junior tennis.",
};

export default function SystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
