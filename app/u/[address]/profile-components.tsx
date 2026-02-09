"use client";

import { useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/Card";
import { MOCK_TOKEN_BALANCES, MOCK_NFTS } from "@/lib/mock-data";

export function PublicProfile({ address }: { address: `0x${string}` }) {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <>
      {/* Profile header with cover */}
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800">
        <div className="relative h-40 sm:h-48">
          <Image
            src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=60"
            alt="Profile cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
        <div className="absolute bottom-4 left-6 right-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
              {ensName || shortAddress}
            </h1>
            {ensName && (
              <p className="font-mono text-sm text-zinc-400">{shortAddress}</p>
            )}
          </div>
          <a
            href={`https://etherscan.io/address/${address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-600 bg-zinc-900/80 px-4 py-2 text-sm text-zinc-300 backdrop-blur hover:border-zinc-500 hover:text-white"
          >
            View on Etherscan
          </a>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Token Balances (mock)">
          <div className="space-y-2">
            {MOCK_TOKEN_BALANCES.map((token) => (
              <div
                key={token.symbol}
                className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3"
              >
                <span className="font-medium text-white">{token.symbol}</span>
                <span className="text-zinc-400">
                  {token.balance} (${token.usdValue})
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card title="NFT Gallery (mock)">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {MOCK_NFTS.map((nft) => (
              <div
                key={nft.id}
                className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-800/30 transition-all hover:border-indigo-500/50"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={nft.image}
                    alt={nft.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3">
                  <p className="truncate font-medium text-white">{nft.name}</p>
                  <p className="text-xs text-zinc-500">{nft.collection}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <p className="text-sm text-zinc-500">Share this profile</p>
        <p className="mt-1 font-mono text-sm text-indigo-400 break-all">
          /u/{address}
        </p>
        <p className="mt-4 text-xs text-zinc-500">
          Share the full URL: your-domain.com/u/{address.slice(0, 10)}...
        </p>
      </div>

      <Link
        href="/dashboard"
        className="inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300"
      >
        ← Back to Dashboard
      </Link>
    </>
  );
}
