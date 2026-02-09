// Ethereum mainnet token addresses for balance fetching

export const MAINNET_CHAIN_ID = 1;

export type TokenInfo = {
  symbol: string;
  name: string;
  address: `0x${string}` | null; // null = native ETH
  decimals: number;
  coingeckoId?: string;
};

export const SUPPORTED_TOKENS: TokenInfo[] = [
  { symbol: "ETH", name: "Ethereum", address: null, decimals: 18, coingeckoId: "ethereum" },
  { symbol: "WETH", name: "Wrapped Ether", address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", decimals: 18, coingeckoId: "ethereum" },
  { symbol: "USDC", name: "USD Coin", address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", decimals: 6, coingeckoId: "usd-coin" },
  { symbol: "USDT", name: "Tether", address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", decimals: 6, coingeckoId: "tether" },
  { symbol: "DAI", name: "Dai", address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", decimals: 18, coingeckoId: "dai" },
];

export function formatBalance(raw: bigint, decimals: number): string {
  const divisor = 10 ** decimals;
  const whole = Number(raw) / divisor;
  if (whole >= 1000) return whole.toLocaleString(undefined, { maximumFractionDigits: 2 });
  if (whole >= 1) return whole.toFixed(4).replace(/\.?0+$/, "");
  if (whole > 0) return whole.toPrecision(4);
  return "0";
}
