"use client";

import { useState, useCallback } from "react";
import { useAccount } from "wagmi";
import { Card } from "@/components/Card";
import {
  getOpenOffers,
  getOffersByMaker,
  addOffer,
  acceptOffer,
  cancelOffer,
  MARKETPLACE_TOKENS,
  type P2POffer,
} from "@/lib/marketplace";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function useMarketplaceOffers() {
  const [offers, setOffers] = useState<P2POffer[]>([]);
  const [myOffers, setMyOffers] = useState<P2POffer[]>([]);

  const refresh = useCallback(() => {
    setOffers(getOpenOffers());
    setMyOffers(getOffersByMaker("")); // will filter by address in component
  }, []);

  return { offers, myOffers, refresh };
}

export function OpenOffersList({
  offers,
  onAccept,
  onRefresh,
  connectedAddress,
}: {
  offers: P2POffer[];
  onAccept: (id: string) => void;
  onRefresh: () => void;
  connectedAddress: string | undefined;
}) {
  const handleAccept = (id: string) => {
    if (!connectedAddress) return;
    acceptOffer(id, connectedAddress);
    onAccept(id);
    onRefresh();
  };

  if (offers.length === 0) {
    return (
      <Card title="Open P2P Offers">
        <p className="text-sm text-zinc-500">No open offers. Create one below.</p>
      </Card>
    );
  }

  return (
    <Card title="Open P2P Offers">
      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white">
                Sell {offer.giveAmount} {offer.giveToken} → Get {offer.wantAmount} {offer.wantToken}
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                by {shortAddress(offer.makerAddress)}
              </p>
            </div>
            {connectedAddress &&
            offer.makerAddress.toLowerCase() !== connectedAddress.toLowerCase() ? (
              <button
                onClick={() => handleAccept(offer.id)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
              >
                Accept offer
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function CreateOfferForm({
  onCreated,
  connectedAddress,
}: {
  onCreated: () => void;
  connectedAddress: string | undefined;
}) {
  const [giveToken, setGiveToken] = useState("ETH");
  const [giveAmount, setGiveAmount] = useState("");
  const [wantToken, setWantToken] = useState("USDC");
  const [wantAmount, setWantAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedAddress || !giveAmount || !wantAmount || giveToken === wantToken) return;
    addOffer({
      makerAddress: connectedAddress,
      giveToken,
      giveAmount: giveAmount.trim(),
      wantToken,
      wantAmount: wantAmount.trim(),
    });
    setGiveAmount("");
    setWantAmount("");
    onCreated();
  };

  const selectClass =
    "rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none";
  const inputClass =
    "w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none";

  return (
    <Card title="Create P2P Offer">
      <p className="mb-4 text-sm text-zinc-500">
        Offer to swap tokens with another user. Real settlement requires smart contract integration.
      </p>
      {!connectedAddress ? (
        <p className="text-sm text-amber-400">Connect your wallet to create an offer.</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs text-zinc-500">You give</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={giveAmount}
                onChange={(e) => setGiveAmount(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
              <select
                value={giveToken}
                onChange={(e) => setGiveToken(e.target.value)}
                className={selectClass}
              >
                {MARKETPLACE_TOKENS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="mb-1 block text-xs text-zinc-500">You want</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={wantAmount}
                onChange={(e) => setWantAmount(e.target.value)}
                placeholder="0"
                className={inputClass}
              />
              <select
                value={wantToken}
                onChange={(e) => setWantToken(e.target.value)}
                className={selectClass}
              >
                {MARKETPLACE_TOKENS.filter((t) => t !== giveToken).map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Create offer
          </button>
        </form>
      )}
    </Card>
  );
}

export function MyOffersList({
  offers,
  onCancel,
  onRefresh,
  connectedAddress,
}: {
  offers: P2POffer[];
  onCancel: (id: string) => void;
  onRefresh: () => void;
  connectedAddress: string | undefined;
}) {
  const myOffers = connectedAddress
    ? offers.filter(
        (o) => o.makerAddress.toLowerCase() === connectedAddress.toLowerCase()
      )
    : [];

  if (myOffers.length === 0) {
    return (
      <Card title="My Offers">
        <p className="text-sm text-zinc-500">You have no offers.</p>
      </Card>
    );
  }

  return (
    <Card title="My Offers">
      <div className="space-y-3">
        {myOffers.map((offer) => (
          <div
            key={offer.id}
            className="flex flex-col gap-2 rounded-xl border border-zinc-800 bg-zinc-800/30 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white">
                {offer.giveAmount} {offer.giveToken} → {offer.wantAmount} {offer.wantToken}
              </p>
              <p className="text-xs text-zinc-500">
                {offer.status} {offer.takerAddress ? `· Taker: ${shortAddress(offer.takerAddress)}` : ""}
              </p>
            </div>
            {offer.status === "open" && (
              <button
                onClick={() => {
                  if (connectedAddress) {
                    cancelOffer(offer.id, connectedAddress);
                    onCancel(offer.id);
                    onRefresh();
                  }
                }}
                className="rounded-lg border border-red-500/50 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10"
              >
                Cancel
              </button>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
