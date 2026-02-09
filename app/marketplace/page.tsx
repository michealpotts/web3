"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import {
  getOpenOffers,
  getOffersByMaker,
} from "@/lib/marketplace";
import {
  OpenOffersList,
  CreateOfferForm,
  MyOffersList,
} from "./marketplace-components";

export default function MarketplacePage() {
  const { address } = useAccount();
  const [openOffers, setOpenOffers] = useState(getOpenOffers());
  const [myOffers, setMyOffers] = useState(getOffersByMaker(address ?? ""));

  const refresh = () => {
    setOpenOffers(getOpenOffers());
    setMyOffers(getOffersByMaker(address ?? ""));
  };

  useEffect(() => {
    refresh();
  }, [address]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 animate-fade-in-up">
        <div className="relative h-40 sm:h-48">
          <Image
            src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80"
            alt="Balance scale — Bitcoin outweighs ETH, SOL, and all other tokens"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Token Marketplace
          </h1>
          <p className="mt-1 text-zinc-400">
            P2P swaps — where Bitcoin outweighs all. Create or accept offers.
          </p>
        </div>
      </div>

      <div className="animate-fade-in-up animate-delay-100">
        <OpenOffersList
        offers={openOffers}
        onAccept={() => {}}
        onRefresh={refresh}
        connectedAddress={address}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-200">
        <CreateOfferForm onCreated={refresh} connectedAddress={address} />
        <MyOffersList
          offers={myOffers}
          onCancel={() => {}}
          onRefresh={refresh}
          connectedAddress={address}
        />
      </div>
    </div>
  );
}
