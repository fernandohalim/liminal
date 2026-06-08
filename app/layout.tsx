import type { Metadata } from "next";
import { Cormorant_Garamond, Bebas_Neue, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LIMINAL — Between States",
  description:
    "A design studio in the in-between. UI/UX, web, illustration and motion — for the space between the expected and the unimagined.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${bebas.variable} ${dmMono.variable} font-mono antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
