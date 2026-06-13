import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const BRAND = {
  systemName: "Tennis Performance Development System™",
  systemShort: "TPDS™",
  manualName: "Performance System Manual™",
  tagline: "Stop collecting random exercises. Implement a complete development system.",
  usp: "Developed by one of Romania's leading Strength & Conditioning Coaches, this is a complete physical development system for junior tennis players, not just a collection of exercises.",
} as const;
