// Custom token mint & deposit pool – types and localStorage

export type CustomToken = {
  id: string;
  name: string;
  symbol: string;
  totalSupply: string;
  creatorAddress: string;
  createdAt: number;
  /** Mock contract address for display */
  contractAddress: string;
};

export type DepositPool = {
  id: string;
  tokenId: string;
  tokenSymbol: string;
  tokenName: string;
  totalDeposited: string;
  depositors: Record<string, string>; // address -> amount
  createdAt: number;
};

const TOKENS_KEY = "web3_custom_tokens";
const POOLS_KEY = "web3_deposit_pools";

function getTokens(): CustomToken[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(TOKENS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setTokens(tokens: CustomToken[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKENS_KEY, JSON.stringify(tokens));
}

function getPools(): DepositPool[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(POOLS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setPools(pools: DepositPool[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(POOLS_KEY, JSON.stringify(pools));
}

export function getAllTokens(): CustomToken[] {
  return getTokens();
}

export function getTokensByCreator(address: string): CustomToken[] {
  return getTokens().filter(
    (t) => t.creatorAddress.toLowerCase() === address.toLowerCase()
  );
}

export function getTokenById(id: string): CustomToken | undefined {
  return getTokens().find((t) => t.id === id);
}

export function createToken(
  name: string,
  symbol: string,
  totalSupply: string,
  creatorAddress: string
): CustomToken {
  const tokens = getTokens();
  const id = `token_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const contractAddress = `0x${Array.from({ length: 40 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join("")}`;
  const token: CustomToken = {
    id,
    name,
    symbol: symbol.toUpperCase().slice(0, 10),
    totalSupply,
    creatorAddress,
    createdAt: Date.now(),
    contractAddress,
  };
  tokens.push(token);
  setTokens(tokens);
  return token;
}

export function getAllPools(): DepositPool[] {
  return getPools();
}

export function getPoolByTokenId(tokenId: string): DepositPool | undefined {
  return getPools().find((p) => p.tokenId === tokenId);
}

export function getPoolsForToken(tokenId: string): DepositPool[] {
  return getPools().filter((p) => p.tokenId === tokenId);
}

export function createPool(tokenId: string, tokenSymbol: string, tokenName: string): DepositPool {
  const pools = getPools();
  if (pools.some((p) => p.tokenId === tokenId)) {
    throw new Error("Pool already exists for this token");
  }
  const id = `pool_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
  const pool: DepositPool = {
    id,
    tokenId,
    tokenSymbol,
    tokenName,
    totalDeposited: "0",
    depositors: {},
    createdAt: Date.now(),
  };
  pools.push(pool);
  setPools(pools);
  return pool;
}

export function depositToPool(
  poolId: string,
  address: string,
  amount: string
): boolean {
  const pools = getPools();
  const idx = pools.findIndex((p) => p.id === poolId);
  if (idx === -1) return false;
  const pool = pools[idx];
  const key = address.toLowerCase();
  const prev = pool.depositors[key] || "0";
  const newAmount = (parseFloat(prev) + parseFloat(amount)).toString();
  pool.depositors[key] = newAmount;
  pool.totalDeposited = (
    parseFloat(pool.totalDeposited) + parseFloat(amount)
  ).toString();
  setPools(pools);
  return true;
}

export function withdrawFromPool(
  poolId: string,
  address: string,
  amount: string
): boolean {
  const pools = getPools();
  const idx = pools.findIndex((p) => p.id === poolId);
  if (idx === -1) return false;
  const pool = pools[idx];
  const key = address.toLowerCase();
  const prev = pool.depositors[key] || "0";
  const toWithdraw = parseFloat(amount);
  const current = parseFloat(prev);
  if (toWithdraw > current) return false;
  const newAmount = current - toWithdraw;
  if (newAmount <= 0) delete pool.depositors[key];
  else pool.depositors[key] = newAmount.toString();
  pool.totalDeposited = (
    parseFloat(pool.totalDeposited) - toWithdraw
  ).toString();
  setPools(pools);
  return true;
}
