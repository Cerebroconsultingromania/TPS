import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Resources",
  description:
    "Expert insights on junior tennis development, coaching methodology and system implementation.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
