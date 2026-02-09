"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Card } from "@/components/Card";
import { TradingViewChart } from "@/components/TradingViewChart";

const PAIRS = [
  { base: "BTC", quote: "USDT", coingeckoId: "bitcoin" },
  { base: "ETH", quote: "USDT", coingeckoId: "ethereum" },
  { base: "BNB", quote: "USDT", coingeckoId: "binancecoin" },
  { base: "SOL", quote: "USDT", coingeckoId: "solana" },
  { base: "XRP", quote: "USDT", coingeckoId: "ripple" },
  { base: "ADA", quote: "USDT", coingeckoId: "cardano" },
  { base: "DOGE", quote: "USDT", coingeckoId: "dogecoin" },
  { base: "AVAX", quote: "USDT", coingeckoId: "avalanche-2" },
  { base: "MATIC", quote: "USDT", coingeckoId: "matic-network" },
  { base: "DOT", quote: "USDT", coingeckoId: "polkadot" },
  { base: "LINK", quote: "USDT", coingeckoId: "chainlink" },
  { base: "LTC", quote: "USDT", coingeckoId: "litecoin" },
  { base: "UNI", quote: "USDT", coingeckoId: "uniswap" },
  { base: "ATOM", quote: "USDT", coingeckoId: "cosmos" },
  { base: "SUI", quote: "USDT", coingeckoId: "sui" },
  { base: "ARB", quote: "USDT", coingeckoId: "arbitrum" },
  { base: "OP", quote: "USDT", coingeckoId: "optimism" },
  { base: "PEPE", quote: "USDT", coingeckoId: "pepe" },
];

type PriceData = { price: number; change24h: number };

async function fetchPrices(): Promise<Record<string, PriceData>> {
  const ids = PAIRS.map((p) => p.coingeckoId).join(",");
  try {
    const res = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await res.json();
    const out: Record<string, PriceData> = {};
    PAIRS.forEach((p) => {
      const d = data[p.coingeckoId];
      if (d) out[p.base] = { price: d.usd, change24h: d.usd_24h_change ?? 0 };
    });
    return out;
  } catch {
    return {};
  }
}

export default function TradePage() {
  const { address } = useAccount();
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [pairIndex, setPairIndex] = useState(0);
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [lastTrade, setLastTrade] = useState<string | null>(null);

  const pair = PAIRS[pairIndex];
  const priceData = prices[pair?.base];
  const price = priceData?.price ?? 0;
  const change24h = priceData?.change24h ?? 0;

  useEffect(() => {
    const load = () => fetchPrices().then(setPrices);
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!pair || isNaN(num) || num <= 0) return;
    const total = num * price;
    setLastTrade(
      `${side.toUpperCase()} ${num} ${pair.base} @ $${price.toFixed(2)} ≈ $${total.toFixed(2)}`
    );
    setAmount("");
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Crypto trading
          </h1>
          <p className="mt-2 text-zinc-400">
            Spot trading with live prices. Connect wallet to trade (mock execution).
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live prices · 15s refresh
        </div>
      </div>

      {/* TradingView Chart */}
      <Card title={`Chart: ${PAIRS[pairIndex]?.base ?? "ETH"}/USDT`}>
        <TradingViewChart symbol={pair?.base ?? "ETH"} />
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card title="">
            <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4 max-h-24 overflow-y-auto">
              {PAIRS.map((p, i) => (
                <button
                  key={p.base}
                  onClick={() => setPairIndex(i)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                    pairIndex === i
                      ? "bg-indigo-600 text-white"
                      : "bg-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {p.base}/{p.quote}
                </button>
              ))}
            </div>
            {pair && (
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-bold text-white">
                  ${price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span
                  className={`text-sm font-medium ${
                    change24h >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {change24h >= 0 ? "+" : ""}
                  {change24h.toFixed(2)}%
                </span>
              </div>
            )}

            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setSide("buy")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                  side === "buy"
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Buy
              </button>
              <button
                onClick={() => setSide("sell")}
                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition ${
                  side === "sell"
                    ? "bg-red-600 text-white"
                    : "bg-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                Sell
              </button>
            </div>

            <form onSubmit={handleTrade} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-xs text-zinc-500">
                  Amount ({pair?.base})
                </label>
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none"
                />
                {price > 0 && amount && !isNaN(parseFloat(amount)) && (
                  <p className="mt-1 text-xs text-zinc-500">
                    ≈ ${(parseFloat(amount) * price).toLocaleString()}{" "}
                    {pair?.quote}
                  </p>
                )}
              </div>
              {!address ? (
                <p className="text-sm text-amber-400">
                  Connect your wallet to place orders.
                </p>
              ) : (
                <button
                  type="submit"
                  className={`w-full rounded-xl py-3.5 text-sm font-semibold text-white transition ${
                    side === "buy"
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "bg-red-600 hover:bg-red-500"
                  }`}
                >
                  {side === "buy" ? "Buy" : "Sell"} {pair?.base}
                </button>
              )}
            </form>
            {lastTrade && (
              <p className="mt-4 rounded-lg bg-zinc-800/50 px-4 py-2 text-sm text-zinc-400">
                Last: {lastTrade}
              </p>
            )}
          </Card>
        </div>

        <div>
          <Card title="Market">
            <div className="max-h-[420px] space-y-3 overflow-y-auto">
              {PAIRS.map((p) => {
                const d = prices[p.base];
                return (
                  <div
                    key={p.base}
                    className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3"
                  >
                    <span className="font-medium text-white">{p.base}</span>
                    <div className="text-right">
                      <p className="text-white">
                        ${d?.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "—"}
                      </p>
                      <p
                        className={`text-xs ${
                          (d?.change24h ?? 0) >= 0 ? "text-emerald-400" : "text-red-400"
                        }`}
                      >
                        {(d?.change24h ?? 0) >= 0 ? "+" : ""}
                        {(d?.change24h ?? 0).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
