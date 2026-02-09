"use client";

import { useEnsName } from "wagmi";
import { mainnet } from "wagmi/chains";
import { Card } from "@/components/Card";
import { useWalletBalances } from "@/hooks/useWalletBalances";
import { useTokenPrices, formatUsd } from "@/hooks/useTokenPrices";
import { MOCK_AIRDROPS, MOCK_IDENTITY_SCORE } from "@/lib/mock-data";

export function WalletSummary({ address }: { address: `0x${string}` }) {
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { balances, isLoading } = useWalletBalances(address);
  const prices = useTokenPrices();

  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const totalUsd = balances.reduce((sum, b) => {
    const price = prices[b.symbol] ?? 0;
    const num = parseFloat(b.balance.replace(/,/g, ""));
    return sum + num * price;
  }, 0);

  return (
    <Card title="Wallet Summary">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Address / ENS
          </p>
          <p className="font-mono text-white">
            {ensName || shortAddress}
            {ensName && (
              <span className="ml-2 text-sm text-zinc-500 font-normal">
                ({shortAddress})
              </span>
            )}
          </p>
        </div>

        <div>
          <p className="mb-2 text-xs uppercase tracking-wider text-zinc-500">
            Token Balances
          </p>
          {isLoading && balances.length === 0 ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-12 animate-pulse rounded-lg bg-zinc-800/50" />
              ))}
            </div>
          ) : balances.length === 0 ? (
            <p className="rounded-lg bg-zinc-800/50 px-4 py-3 text-sm text-zinc-500">
              No token balances on Ethereum mainnet
            </p>
          ) : (
            <div className="space-y-2">
              {balances.map((token) => {
                const price = prices[token.symbol] ?? 0;
                const num = parseFloat(token.balance.replace(/,/g, ""));
                const usd = num * price;
                return (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3"
                  >
                    <span className="font-medium text-white">{token.symbol}</span>
                    <div className="text-right">
                      <p className="text-white">{token.balance}</p>
                      <p className="text-xs text-zinc-500">
                        {price > 0 ? formatUsd(usd) : "—"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {totalUsd > 0 && (
          <div className="rounded-lg bg-zinc-800/50 px-4 py-3">
            <p className="text-xs text-zinc-500">Total (USD)</p>
            <p className="text-xl font-semibold text-white">{formatUsd(totalUsd)}</p>
          </div>
        )}

        <div className="rounded-lg bg-zinc-800/50 px-4 py-3">
          <p className="text-xs text-zinc-500">NFT Count (mock)</p>
          <p className="text-xl font-semibold text-white">—</p>
        </div>
      </div>
    </Card>
  );
}

export function IdentityScoreCard() {
  const score = MOCK_IDENTITY_SCORE;
  const tier =
    score >= 800 ? "Gold" : score >= 600 ? "Silver" : score >= 400 ? "Bronze" : "New";

  return (
    <Card title="Identity Score">
      <div className="space-y-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-indigo-400">{score}</span>
          <span className="text-zinc-500">/ 1000</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full rounded-full bg-indigo-500"
            style={{ width: `${(score / 1000) * 100}%` }}
          />
        </div>
        <p className="text-sm text-zinc-400">
          Tier: <span className="font-medium text-amber-400">{tier}</span>
        </p>
        <p className="text-xs text-zinc-500">
          Mock calculation — based on on-chain activity, holdings, and history.
        </p>
      </div>
    </Card>
  );
}

export function AirdropList() {
  return (
    <Card title="Airdrops">
      <p className="mb-4 text-sm text-zinc-500">
        Eligibility status based on wallet activity (mock data)
      </p>
      <div className="space-y-3">
        {MOCK_AIRDROPS.map((airdrop) => (
          <div
            key={airdrop.id}
            className="flex flex-col gap-2 rounded-lg border border-zinc-800 bg-zinc-800/30 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white">{airdrop.name}</p>
              <p className="text-sm text-zinc-500">{airdrop.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  airdrop.eligible
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-zinc-700 text-zinc-400"
                }`}
              >
                {airdrop.eligible ? "Eligible" : "Not eligible"}
              </span>
              {airdrop.eligible && (
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    airdrop.claimed
                      ? "bg-zinc-600 text-zinc-400"
                      : "bg-indigo-500/20 text-indigo-400"
                  }`}
                >
                  {airdrop.claimed ? "Claimed" : "Claim"}
                </span>
              )}
              {airdrop.reward && (
                <span className="text-sm text-zinc-400">{airdrop.reward}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
