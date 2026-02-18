import type { Metadata } from "next";
import { Gilda_Display, Noto_Serif } from "next/font/google";
import "./globals.css";

import { HtmlProvider } from "./providers";
import Header from "./components/Header";
import Footer from "./components/Footer";

const noto = Noto_Serif({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-body",
  preload: true,
});

const gilda = Gilda_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Auralize",
  description: "A screen reader preview tool for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${noto.variable} ${gilda.variable}`}>
      <body
        className={`${noto.className}   antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <Header />{" "}
        <main className="flex-1">
          <HtmlProvider>{children}</HtmlProvider>{" "}
        </main>
        <Footer />
      </body>
    </html>
  );
}
