import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/Navbar";
import { RewardSpinFab } from "@/components/RewardSpinFab";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Web3 Hub — Identity, Trade, Rewards & Tools",
    template: "%s | Web3 Hub",
  },
  description:
    "Your Web3 command center: on-chain identity, live crypto trading, P2P marketplace, token mint, dog PFP generator, and essential tools. Connect your wallet and get started.",
  keywords: ["Web3", "crypto", "trading", "identity", "rewards", "blockchain", "wallet", "DeFi"],
  authors: [{ name: "Web3 Hub" }],
  creator: "Web3 Hub",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Web3 Hub",
    title: "Web3 Hub — Identity, Trade, Rewards & Tools",
    description: "Your Web3 command center: identity, trading, marketplace, mint, and tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Web3 Hub — Identity, Trade, Rewards & Tools",
    description: "Your Web3 command center: identity, trading, marketplace, and tools.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} min-h-screen bg-zinc-950 font-sans text-zinc-100 antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="relative z-10 mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </main>
          <RewardSpinFab />
        </Providers>
      </body>
    </html>
  );
}
