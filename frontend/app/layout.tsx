import type { Metadata } from "next";
import { Orbitron, Metamorphous } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const orbitron = Orbitron({
  subsets: ["latin"],
});
const metamorphous = Metamorphous({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio of Roberta Nogara",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.className} ${metamorphous.className} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
