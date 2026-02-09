"use client";

import { useState } from "react";
import { Card } from "@/components/Card";
import {
  MOCK_RATES,
  MOCK_GAS_FEES,
} from "@/lib/mock-data";

export function CryptoConverter() {
  const [amount, setAmount] = useState("1");
  const [currency, setCurrency] = useState<"usd" | "inr">("usd");

  const numAmount = parseFloat(amount) || 0;
  const usdValue = (numAmount * MOCK_RATES.ethUsd).toFixed(2);
  const inrValue = (numAmount * MOCK_RATES.ethInr).toLocaleString("en-IN");

  return (
    <Card title="Crypto → Fiat Converter">
      <p className="mb-4 text-sm text-zinc-500">
        ETH to USD / INR (mock rate: 1 ETH = ${MOCK_RATES.ethUsd.toLocaleString()})
      </p>
      <div className="space-y-4">
        <div>
          <label htmlFor="amount" className="mb-1 block text-sm text-zinc-400">
            Amount (ETH)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="0"
          />
        </div>
        <div className="rounded-lg bg-zinc-800/50 p-4">
          <p className="text-sm text-zinc-500">Converted value</p>
          <p className="mt-1 text-xl font-semibold text-white">
            {currency === "usd" ? `$${usdValue}` : `₹${inrValue}`}
          </p>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => setCurrency("usd")}
              className={`rounded px-2 py-1 text-sm ${
                currency === "usd" ? "bg-indigo-600 text-white" : "bg-zinc-700 text-zinc-400"
              }`}
            >
              USD
            </button>
            <button
              onClick={() => setCurrency("inr")}
              className={`rounded px-2 py-1 text-sm ${
                currency === "inr" ? "bg-indigo-600 text-white" : "bg-zinc-700 text-zinc-400"
              }`}
            >
              INR
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function GasTracker() {
  return (
    <Card title="Gas Fee Tracker">
      <p className="mb-4 text-sm text-zinc-500">
        Ethereum mainnet (mock data)
      </p>
      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
          <span className="text-zinc-400">Slow</span>
          <span className="font-mono text-white">{MOCK_GAS_FEES.slow} gwei</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
          <span className="text-zinc-400">Standard</span>
          <span className="font-mono text-white">{MOCK_GAS_FEES.standard} gwei</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-zinc-800/50 px-4 py-3">
          <span className="text-zinc-400">Fast</span>
          <span className="font-mono text-white">{MOCK_GAS_FEES.fast} gwei</span>
        </div>
        <p className="pt-2 text-xs text-zinc-500">
          Base fee: {MOCK_GAS_FEES.baseFee} gwei
        </p>
      </div>
    </Card>
  );
}

export function TokenChecker() {
  const [address, setAddress] = useState("");
  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    if (address.trim()) setChecked(true);
  };

  return (
    <Card title="Token Safety Checker">
      <p className="mb-4 text-sm text-zinc-500">
        Enter a token contract address to check safety (mock result)
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="token-address" className="mb-1 block text-sm text-zinc-400">
            Contract Address
          </label>
          <input
            id="token-address"
            type="text"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setChecked(false);
            }}
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 font-mono text-sm text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="0x..."
          />
        </div>
        <button
          onClick={handleCheck}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
        >
          Check
        </button>
      </div>

      {checked && (
        <div className="mt-6 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
          <p className="font-medium text-emerald-400">✓ Looks safe (mock)</p>
          <p className="mt-2 text-sm text-zinc-400">
            Verified contract. No honeypot detected. Liquidity locked. (This is
            mock data.)
          </p>
        </div>
      )}
    </Card>
  );
}
