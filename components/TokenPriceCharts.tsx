"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type PricePoint = { time: string; price: number; fullDate: string };

type TokenData = {
  symbol: string;
  name: string;
  price: number | null;
  change24h: number | null;
  history: PricePoint[];
  color: string;
};

const COINGECKO_IDS: Record<string, string> = {
  ETH: "ethereum",
  BTC: "bitcoin",
  SOL: "solana",
};

async function fetchTokenData(symbol: string): Promise<Partial<TokenData>> {
  const id = COINGECKO_IDS[symbol];
  if (!id) return {};

  const [priceRes, chartRes] = await Promise.all([
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true`
    ),
    fetch(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`
    ),
  ]);

  const priceData = await priceRes.json();
  const chartData = await chartRes.json();

  if (!priceData[id] || !chartData.prices?.length) return {};

  const prices = chartData.prices as [number, number][];
  const history: PricePoint[] = prices.map(([ts, price]) => {
    const d = new Date(ts);
    return {
      time: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: d.toLocaleString(),
      price: Math.round(price * 100) / 100,
    };
  });

  const change24h = priceData[id].usd_24h_change ?? null;

  return {
    symbol,
    name: id.charAt(0).toUpperCase() + id.slice(1),
    price: priceData[id].usd,
    change24h,
    history,
    color: symbol === "ETH" ? "#6366f1" : symbol === "BTC" ? "#f59e0b" : "#22c55e",
  };
}

export function TokenPriceCharts() {
  const [tokens, setTokens] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPrices = async () => {
    const results = await Promise.all(
      Object.keys(COINGECKO_IDS).map((sym) =>
        fetchTokenData(sym).then((d) => ({
          symbol: sym,
          name: d.name || sym,
          price: d.price ?? null,
          change24h: d.change24h ?? null,
          history: d.history ?? [],
          color: d.color ?? "#6366f1",
        }))
      )
    );
    setTokens(results.filter((t) => t.price != null));
    setLoading(false);
  };

  useEffect(() => {
    loadPrices();
    const interval = setInterval(loadPrices, 60_000);
    return () => clearInterval(interval);
  }, []);

  if (loading && tokens.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
        <h3 className="mb-6 text-lg font-semibold text-white">
          Live Token Prices
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-xl bg-zinc-800/50"
            />
          ))}
        </div>
      </div>
    );
  }

  if (tokens.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Token Prices</h3>
        <span className="text-xs text-zinc-500">Updates every 60s · CoinGecko</span>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 transition-colors hover:border-zinc-700"
          >
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-white">
                  {token.symbol}
                  <span className="ml-1.5 text-sm font-normal text-zinc-500">
                    {token.name}
                  </span>
                </p>
                <p className="mt-0.5 text-xl font-bold text-white">
                  ${token.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
              {token.change24h != null && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    token.change24h >= 0
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {token.change24h >= 0 ? "+" : ""}
                  {token.change24h.toFixed(2)}%
                </span>
              )}
            </div>
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={token.history} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient
                      id={`gradient-${token.symbol}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor={token.color} stopOpacity={0.3} />
                      <stop offset="100%" stopColor={token.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="time"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#71717a", fontSize: 10 }}
                  />
                  <YAxis
                    domain={["auto", "auto"]}
                    hide
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#18181b",
                      border: "1px solid #27272a",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#a1a1aa" }}
                    formatter={(value: number) => [`$${Number(value).toLocaleString()}`, "Price"]}
                    labelFormatter={(_, payloads) =>
                      (payloads?.[0]?.payload as PricePoint)?.fullDate ?? ""
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke={token.color}
                    strokeWidth={2}
                    fill={`url(#gradient-${token.symbol})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
