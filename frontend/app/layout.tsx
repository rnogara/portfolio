import type { Metadata } from "next";
import { Orbitron, Metamorphous, Jura } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Toaster } from "./components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

const orbitron = Orbitron({
  subsets: ["latin"],
});
const metamorphous = Metamorphous({
  subsets: ["latin"],
  weight: "400",
});
const jura = Jura({
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Roberta Nogara - Portfolio",
  description: "Portfolio of Roberta Nogara a Full Stack Developer",
  icons: [{
    rel: "icon",
    url: "/favicon.png",
  }],
  openGraph: {
    title: "Roberta Nogara - Portfolio",
    description: "Portfolio of Roberta Nogara a Full Stack Developer",
    images: [{ url: "/og-image.png" }],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.className} ${metamorphous.className} ${jura.className} antialiased`}
      >
        <Providers>
          {children}
          <Toaster />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
