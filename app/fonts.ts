import { Bricolage_Grotesque, Inter } from "next/font/google";

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// The Hush AI wordmark is set in Bricolage Grotesque SemiBold.
export const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const fontVariables = `${inter.variable} ${bricolage.variable}`;
