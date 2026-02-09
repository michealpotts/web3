"use client";

import { useAccount } from "wagmi";
import Link from "next/link";
import {
  Card,
  WalletSummary,
  IdentityScoreCard,
  AirdropList,
} from "./dashboard-components";

export default function DashboardPage() {
  const { address, isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 animate-fade-in-up">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=60"
            alt=""
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/95 to-indigo-950/80" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-8 py-24 text-center">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Connect your wallet to view the dashboard
          </h2>
          <p className="mt-6 max-w-md text-zinc-300">
            Use the Connect Wallet button in the navbar to get started. You&apos;ll
            need MetaMask, WalletConnect, or another supported wallet.
          </p>
          <Link
            href="/"
            className="mt-10 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <Link
          href={`/u/${address}`}
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          View public profile →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 animate-fade-in-up animate-delay-100">
          <WalletSummary address={address!} />
        </div>
        <div className="animate-fade-in-up animate-delay-200">
          <IdentityScoreCard />
        </div>
      </div>

      <div className="animate-fade-in-up animate-delay-300">
        <AirdropList />
      </div>
    </div>
  );
}
