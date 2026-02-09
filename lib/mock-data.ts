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

// Mock NFT gallery - high-quality abstract/digital art images
export const MOCK_NFTS: NftItem[] = [
  { id: "1", name: "Neon Grid #1234", image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=400&h=400&fit=crop", collection: "Digital Dreams" },
  { id: "2", name: "Crypto Wave #5678", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=400&fit=crop", collection: "Block Art" },
  { id: "3", name: "Cosmic Fractal #9012", image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=400&fit=crop", collection: "Art Blocks" },
  { id: "4", name: "Neural Network #42", image: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=400&h=400&fit=crop", collection: "Future Proof" },
  { id: "5", name: "Liquid Metal #777", image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=400&fit=crop", collection: "Abstract Labs" },
  { id: "6", name: "Ethereum Glow", image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=400&fit=crop", collection: "ENS" },
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
