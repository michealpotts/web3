// Mock data for frontend - replace with real API calls later

export type TokenBalance = {
  symbol: string;
  name: string;
  balance: string;
  usdValue: string;
  logo?: string;
};

export type NftItem = {
  id: string;
  name: string;
  image: string;
  collection: string;
};

export type AirdropItem = {
  id: string;
  name: string;
  description: string;
  eligible: boolean;
  claimed: boolean;
  reward?: string;
};

export type GasFeeData = {
  slow: string;
  standard: string;
  fast: string;
  baseFee: string;
};

// Mock token balances
export const MOCK_TOKEN_BALANCES: TokenBalance[] = [
  { symbol: "ETH", name: "Ethereum", balance: "1.245", usdValue: "4,231.50" },
  { symbol: "USDC", name: "USD Coin", balance: "5,000.00", usdValue: "5,000.00" },
  { symbol: "USDT", name: "Tether", balance: "2,340.00", usdValue: "2,340.00" },
  { symbol: "WBTC", name: "Wrapped BTC", balance: "0.05", usdValue: "4,521.00" },
];

// Mock NFT gallery (placeholder images)
export const MOCK_NFTS: NftItem[] = [
  { id: "1", name: "Cool Ape #1234", image: "https://via.placeholder.com/200x200/6366f1/ffffff?text=NFT+1", collection: "Cool Apes" },
  { id: "2", name: "Pixel Punk #5678", image: "https://via.placeholder.com/200x200/8b5cf6/ffffff?text=NFT+2", collection: "Pixel Punks" },
  { id: "3", name: "Art Block #9012", image: "https://via.placeholder.com/200x200/a855f7/ffffff?text=NFT+3", collection: "Art Blocks" },
  { id: "4", name: "Ethereum Name #42", image: "https://via.placeholder.com/200x200/ec4899/ffffff?text=ENS", collection: "ENS" },
];

// Mock airdrops
export const MOCK_AIRDROPS: AirdropItem[] = [
  { id: "1", name: "Protocol A", description: "Early user reward", eligible: true, claimed: true, reward: "500 TOKEN" },
  { id: "2", name: "Protocol B", description: "Liquidity provider airdrop", eligible: true, claimed: false, reward: "1,200 TOKEN" },
  { id: "3", name: "Protocol C", description: "NFT holder exclusive", eligible: false, claimed: false },
  { id: "4", name: "Protocol D", description: "Coming soon", eligible: false, claimed: false },
];

// Mock gas fees (gwei)
export const MOCK_GAS_FEES: GasFeeData = {
  slow: "12",
  standard: "25",
  fast: "35",
  baseFee: "10",
};

// Mock exchange rates
export const MOCK_RATES = {
  ethUsd: 3398.5,
  ethInr: 282500,
  btcUsd: 90420,
};

// Mock identity score (0-1000)
export const MOCK_IDENTITY_SCORE = 847;
