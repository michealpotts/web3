"use client";

import { useMemo } from "react";
import { useBalance } from "wagmi";
import { mainnet } from "wagmi/chains";
import { SUPPORTED_TOKENS, formatBalance, type TokenInfo } from "@/lib/tokens";

export type WalletBalanceRow = {
  symbol: string;
  name: string;
  balance: string;
  raw: bigint;
  decimals: number;
  usdValue: string | null;
};

export function useWalletBalances(address: `0x${string}` | undefined) {
  const ethBalance = useBalance({
    address,
    chainId: mainnet.id,
  });

  const usdcBalance = useBalance({
    address,
    token: SUPPORTED_TOKENS.find((t) => t.symbol === "USDC")?.address,
    chainId: mainnet.id,
  });

  const usdtBalance = useBalance({
    address,
    token: SUPPORTED_TOKENS.find((t) => t.symbol === "USDT")?.address,
    chainId: mainnet.id,
  });

  const daiBalance = useBalance({
    address,
    token: SUPPORTED_TOKENS.find((t) => t.symbol === "DAI")?.address,
    chainId: mainnet.id,
  });

  const wethBalance = useBalance({
    address,
    token: SUPPORTED_TOKENS.find((t) => t.symbol === "WETH")?.address,
    chainId: mainnet.id,
  });

  const balances = useMemo((): WalletBalanceRow[] => {
    if (!address) return [];

    const rows: WalletBalanceRow[] = [];

    if (ethBalance.data) {
      const formatted = formatBalance(ethBalance.data.value, 18);
      if (formatted !== "0" || rows.length === 0) {
        rows.push({
          symbol: "ETH",
          name: "Ethereum",
          balance: formatted,
          raw: ethBalance.data.value,
          decimals: 18,
          usdValue: null,
        });
      }
    }

    const erc20s = [
      { data: wethBalance.data, token: SUPPORTED_TOKENS.find((t) => t.symbol === "WETH")! },
      { data: usdcBalance.data, token: SUPPORTED_TOKENS.find((t) => t.symbol === "USDC")! },
      { data: usdtBalance.data, token: SUPPORTED_TOKENS.find((t) => t.symbol === "USDT")! },
      { data: daiBalance.data, token: SUPPORTED_TOKENS.find((t) => t.symbol === "DAI")! },
    ];

    for (const { data, token } of erc20s) {
      if (!data || !token.address) continue;
      const formatted = formatBalance(data.value, token.decimals);
      if (formatted !== "0") {
        rows.push({
          symbol: token.symbol,
          name: token.name,
          balance: formatted,
          raw: data.value,
          decimals: token.decimals,
          usdValue: null,
        });
      }
    }

    return rows;
  }, [
    address,
    ethBalance.data,
    wethBalance.data,
    usdcBalance.data,
    usdtBalance.data,
    daiBalance.data,
  ]);

  const isLoading =
    address &&
    (ethBalance.isLoading ||
      usdcBalance.isLoading ||
      usdtBalance.isLoading ||
      daiBalance.isLoading ||
      wethBalance.isLoading);

  return { balances, isLoading };
}
