// Daily spin & gifts – localStorage persistence

const SPIN_KEY = "web3_last_spin";
const GIFTS_KEY = "web3_claimed_gifts";

export const SPIN_REWARDS = [
  { id: "1", label: "10 points", value: 10 },
  { id: "2", label: "25 points", value: 25 },
  { id: "3", label: "50 points", value: 50 },
  { id: "4", label: "100 points", value: 100 },
  { id: "5", label: "0.001 ETH", value: "eth" },
  { id: "6", label: "5 USDC", value: "usdc" },
  { id: "7", label: "Better luck!", value: 0 },
  { id: "8", label: "200 points", value: 200 },
];

export const AVAILABLE_GIFTS = [
  { id: "g1", name: "Welcome Pack", description: "50 points + badge", claimedKey: "welcome" },
  { id: "g2", name: "Daily Bonus", description: "10 points", claimedKey: "daily" },
  { id: "g3", name: "Lucky Token", description: "0.0005 ETH", claimedKey: "lucky" },
  { id: "g4", name: "Mystery Box", description: "Random 10–100 points", claimedKey: "mystery" },
];

export function getLastSpinTime(): number | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(SPIN_KEY);
  return raw ? parseInt(raw, 10) : null;
}

export function setLastSpinTime(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(SPIN_KEY, Date.now().toString());
}

export function canSpinToday(): boolean {
  const last = getLastSpinTime();
  if (!last) return true;
  const dayMs = 24 * 60 * 60 * 1000;
  return Date.now() - last >= dayMs;
}

export function getNextSpinIn(): string {
  const last = getLastSpinTime();
  if (!last) return "0";
  const next = last + 24 * 60 * 60 * 1000;
  const remaining = Math.max(0, next - Date.now());
  const hours = Math.floor(remaining / (60 * 60 * 1000));
  const mins = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
  return `${hours}h ${mins}m`;
}

export function getClaimedGifts(): Set<string> {
  if (typeof window === "undefined") return new Set();
  const raw = localStorage.getItem(GIFTS_KEY);
  if (!raw) return new Set();
  try {
    return new Set(JSON.parse(raw));
  } catch {
    return new Set();
  }
}

export function claimGift(id: string): void {
  const set = getClaimedGifts();
  set.add(id);
  localStorage.setItem(GIFTS_KEY, JSON.stringify([...set]));
}
