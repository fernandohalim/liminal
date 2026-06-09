import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Mono } from "next/font/google";
import "./globals.css";
import Grain from "@/components/Grain";
import Texture from "@/components/Texture";
import Cursor from "@/components/Cursor";
import Frame from "@/components/Frame";
import ScrollReel from "@/components/ScrollReel";
import SmoothScroll from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
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
        className={`${cormorant.variable} ${dmMono.variable} font-mono antialiased`}
      >
        <SmoothScroll />
        <Grain />
        <Texture />
        <Cursor />
        <Frame />
        <ScrollReel />
        {children}
      </body>
    </html>
  );
}
