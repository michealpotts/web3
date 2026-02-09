"use client";

import { useEffect, useState } from "react";

const STABLES = ["USDC", "USDT", "DAI", "WETH"];

export function useTokenPrices() {
  const [prices, setPrices] = useState<Record<string, number>>({
    ETH: 0,
    WETH: 0,
    USDC: 1,
    USDT: 1,
    DAI: 1,
  });

  useEffect(() => {
    let cancelled = false;
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    )
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        const eth = data?.ethereum?.usd ?? 0;
        setPrices((p) => ({ ...p, ETH: eth, WETH: eth }));
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return prices;
}

export function formatUsd(value: number): string {
  if (value >= 1000) return `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
  if (value >= 1) return `$${value.toFixed(2)}`;
  return `$${value.toFixed(4)}`;
}
