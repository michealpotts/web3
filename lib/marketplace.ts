// P2P token marketplace – offer types and localStorage persistence

export type OfferStatus = "open" | "completed" | "cancelled";

export type P2POffer = {
  id: string;
  makerAddress: string;
  giveToken: string;
  giveAmount: string;
  wantToken: string;
  wantAmount: string;
  status: OfferStatus;
  createdAt: number;
  completedAt?: number;
  takerAddress?: string;
};

const STORAGE_KEY = "web3_marketplace_offers";

function getOffers(): P2POffer[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setOffers(offers: P2POffer[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
}

export function getAllOffers(): P2POffer[] {
  return getOffers();
}

export function getOpenOffers(): P2POffer[] {
  return getOffers().filter((o) => o.status === "open");
}

export function getOffersByMaker(address: string): P2POffer[] {
  return getOffers().filter(
    (o) => o.makerAddress.toLowerCase() === address.toLowerCase()
  );
}

export function addOffer(offer: Omit<P2POffer, "id" | "createdAt" | "status">): P2POffer {
  const offers = getOffers();
  const newOffer: P2POffer = {
    ...offer,
    id: `offer_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    status: "open",
    createdAt: Date.now(),
  };
  offers.unshift(newOffer);
  setOffers(offers);
  return newOffer;
}

export function acceptOffer(offerId: string, takerAddress: string): boolean {
  const offers = getOffers();
  const idx = offers.findIndex((o) => o.id === offerId && o.status === "open");
  if (idx === -1) return false;
  offers[idx] = {
    ...offers[idx],
    status: "completed",
    completedAt: Date.now(),
    takerAddress,
  };
  setOffers(offers);
  return true;
}

export function cancelOffer(offerId: string, makerAddress: string): boolean {
  const offers = getOffers();
  const idx = offers.findIndex(
    (o) => o.id === offerId && o.makerAddress.toLowerCase() === makerAddress.toLowerCase() && o.status === "open"
  );
  if (idx === -1) return false;
  offers[idx] = { ...offers[idx], status: "cancelled" };
  setOffers(offers);
  return true;
}

export const MARKETPLACE_TOKENS = ["ETH", "WETH", "USDC", "USDT", "DAI"];
