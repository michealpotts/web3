"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Card } from "@/components/Card";
import {
  getAllTokens,
  getAllPools,
  createToken,
  createPool,
  depositToPool,
  withdrawFromPool,
  type CustomToken,
  type DepositPool,
} from "@/lib/mint";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function CreateTokenForm({
  onCreated,
  connectedAddress,
}: {
  onCreated: () => void;
  connectedAddress: string | undefined;
}) {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedAddress || !name.trim() || !symbol.trim() || !supply.trim()) return;
    const num = parseFloat(supply);
    if (isNaN(num) || num <= 0) return;
    const token = createToken(name.trim(), symbol.trim(), supply.trim(), connectedAddress);
    try {
      createPool(token.id, token.symbol, token.name);
    } catch {
      // Pool already exists for this token, ignore
    }
    onCreated();
    setName("");
    setSymbol("");
    setSupply("");
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none";

  return (
    <Card title="Create custom token">
      <p className="mb-4 text-sm text-zinc-500">
        Mint a custom token (stored locally). Connect wallet to create. A deposit pool is created automatically.
      </p>
      {!connectedAddress ? (
        <p className="text-sm text-amber-400">Connect your wallet to create a token.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Token name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Token"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Symbol</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="MTK"
              maxLength={10}
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">Initial supply</label>
            <input
              type="text"
              value={supply}
              onChange={(e) => setSupply(e.target.value)}
              placeholder="1000000"
              className={inputClass}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Mint token & create pool
          </button>
        </form>
      )}
    </Card>
  );
}

export function MyTokensList({
  tokens,
  connectedAddress,
}: {
  tokens: CustomToken[];
  connectedAddress: string | undefined;
}) {
  const mine = connectedAddress
    ? tokens.filter((t) => t.creatorAddress.toLowerCase() === connectedAddress.toLowerCase())
    : [];

  if (mine.length === 0) {
    return (
      <Card title="My tokens">
        <p className="text-sm text-zinc-500">You have not created any tokens yet.</p>
      </Card>
    );
  }

  return (
    <Card title="My tokens">
      <div className="space-y-3">
        {mine.map((t) => (
          <div
            key={t.id}
            className="rounded-xl border border-zinc-800 bg-zinc-800/30 p-4"
          >
            <p className="font-medium text-white">
              {t.name} ({t.symbol})
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Supply: {t.totalSupply} · {shortAddress(t.contractAddress)}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function DepositPoolCard({
  pool,
  onDeposit,
  onWithdraw,
  connectedAddress,
}: {
  pool: DepositPool;
  onDeposit: () => void;
  onWithdraw: () => void;
  connectedAddress: string | undefined;
}) {
  const [amount, setAmount] = useState("");
  const [mode, setMode] = useState<"deposit" | "withdraw">("deposit");
  const userDeposit = connectedAddress
    ? pool.depositors[connectedAddress.toLowerCase()] ?? "0"
    : "0";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedAddress || !amount || parseFloat(amount) <= 0) return;
    if (mode === "deposit") {
      depositToPool(pool.id, connectedAddress, amount);
      onDeposit();
    } else {
      const ok = withdrawFromPool(pool.id, connectedAddress, amount);
      if (ok) onWithdraw();
    }
    setAmount("");
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none";

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold text-white">
            {pool.tokenName} ({pool.tokenSymbol}) pool
          </p>
          <p className="text-sm text-zinc-500">
            Total deposited: {pool.totalDeposited} {pool.tokenSymbol}
          </p>
          {connectedAddress && parseFloat(userDeposit) > 0 && (
            <p className="text-sm text-indigo-400 mt-1">
              Your deposit: {userDeposit} {pool.tokenSymbol}
            </p>
          )}
        </div>
      </div>
      {connectedAddress && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode("deposit")}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                mode === "deposit" ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              Deposit
            </button>
            <button
              type="button"
              onClick={() => setMode("withdraw")}
              className={`rounded-lg px-3 py-1.5 text-sm ${
                mode === "withdraw" ? "bg-indigo-600 text-white" : "bg-zinc-800 text-zinc-400"
              }`}
            >
              Withdraw
            </button>
          </div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={mode === "deposit" ? "Amount to deposit" : "Amount to withdraw"}
            className={inputClass}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-700 py-2 text-sm font-medium text-white hover:bg-zinc-600"
          >
            {mode === "deposit" ? "Deposit" : "Withdraw"}
          </button>
        </form>
      )}
    </div>
  );
}
