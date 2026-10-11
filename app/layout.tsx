
import SiteHeader from "@/components/site-header";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "বাজার দর | BazarDor",
    template: "%s | বাজার দর",
  },
  description:
    "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে দেখুন। চাল, ডাল, তেল, সবজি, মাছ ও অন্যান্য পণ্যের দাম তুলনা করুন।",
  applicationName: "BazarDor",
  keywords: [
    "বাজার দর",
    "বাংলাদেশ বাজার মূল্য",
    "নিত্যপ্রয়োজনীয় পণ্যের দাম",
    "BazarDor",
    "Bangladesh market prices",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#176b45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html
    lang="bn"
    className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col">
      <SiteHeader />
      {children}
    </body>
  </html>
);
}
