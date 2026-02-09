"use client";

import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { getAllTokens, getAllPools } from "@/lib/mint";
import {
  CreateTokenForm,
  MyTokensList,
  DepositPoolCard,
} from "./mint-components";

export default function MintPage() {
  const { address } = useAccount();
  const [tokens, setTokens] = useState(getAllTokens());
  const [pools, setPools] = useState(getAllPools());

  const refresh = () => {
    setTokens(getAllTokens());
    setPools(getAllPools());
  };

  useEffect(() => {
    refresh();
  }, [address]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Custom token mint
        </h1>
        <p className="mt-2 text-zinc-400">
          Create a custom token and a deposit pool. Deposit or withdraw from pools (stored locally).
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CreateTokenForm onCreated={refresh} connectedAddress={address} />
        <MyTokensList tokens={tokens} connectedAddress={address} />
      </div>

      {pools.length > 0 && (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-white">Deposit pools</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {pools.map((pool) => (
              <DepositPoolCard
                key={pool.id}
                pool={pool}
                onDeposit={refresh}
                onWithdraw={refresh}
                connectedAddress={address}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
