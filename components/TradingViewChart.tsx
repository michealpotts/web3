"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const TRADINGVIEW_SYMBOLS: Record<string, string> = {
  ETH: "BINANCE:ETHUSDT",
  BTC: "BINANCE:BTCUSDT",
  SOL: "BINANCE:SOLUSDT",
  BNB: "BINANCE:BNBUSDT",
  XRP: "BINANCE:XRPUSDT",
  ADA: "BINANCE:ADAUSDT",
  DOGE: "BINANCE:DOGEUSDT",
  AVAX: "BINANCE:AVAXUSDT",
  MATIC: "BINANCE:MATICUSDT",
  DOT: "BINANCE:DOTUSDT",
  LINK: "BINANCE:LINKUSDT",
  LTC: "BINANCE:LTCUSDT",
  UNI: "BINANCE:UNIUSDT",
  ATOM: "BINANCE:ATOMUSDT",
  SUI: "BINANCE:SUIUSDT",
  ARB: "BINANCE:ARBUSDT",
  OP: "BINANCE:OPUSDT",
  PEPE: "BINANCE:PEPEUSDT",
};

declare global {
  interface Window {
    TradingView?: { widget: new (opts: Record<string, unknown>) => unknown };
  }
}

export function TradingViewChart({ symbol }: { symbol: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const tvSymbol = TRADINGVIEW_SYMBOLS[symbol] ?? "BINANCE:ETHUSDT";

  useEffect(() => {
    if (!scriptReady || !containerRef.current || !window.TradingView) return;
    const container = containerRef.current;
    container.innerHTML = "";
    const id = `tradingview_${tvSymbol.replace(/:/g, "_")}_${Date.now()}`;
    container.id = id;
    new window.TradingView!.widget({
      autosize: true,
      symbol: tvSymbol,
      interval: "5",
      timezone: "Etc/UTC",
      theme: "dark",
      style: "1",
      locale: "en",
      toolbar_bg: "#18181b",
      enable_publishing: false,
      allow_symbol_change: true,
      container_id: id,
      studies_overrides: {},
      overrides: {
        "paneProperties.background": "#18181b",
        "mainSeriesProperties.candleStyle.upColor": "#22c55e",
        "mainSeriesProperties.candleStyle.downColor": "#ef4444",
      },
    });
    return () => {
      container.innerHTML = "";
    };
  }, [scriptReady, tvSymbol]);

  return (
    <>
      <Script
        src="https://s3.tradingview.com/tv.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />
      <div
        ref={containerRef}
        className="h-[400px] w-full min-h-[300px] rounded-xl overflow-hidden bg-zinc-900"
      />
    </>
  );
}
