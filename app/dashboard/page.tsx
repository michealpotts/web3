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
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <h2 className="text-2xl font-semibold text-white">
          Connect your wallet to view the dashboard
        </h2>
        <p className="mt-4 max-w-md text-zinc-400">
          Use the Connect Wallet button in the navbar to get started. You&apos;ll
          need MetaMask, WalletConnect, or another supported wallet.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
        <Link
          href={`/u/${address}`}
          className="text-sm font-medium text-indigo-400 hover:text-indigo-300"
        >
          View public profile →
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WalletSummary address={address!} />
        </div>
        <div>
          <IdentityScoreCard />
        </div>
      </div>

      <AirdropList />
    </div>
  );
}
