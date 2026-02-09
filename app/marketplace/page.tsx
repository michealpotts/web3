"use client";

import { useState, useEffect } from "react";
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Token Marketplace
        </h1>
        <p className="mt-2 text-zinc-400">
          Trade tokens P2P. Create or accept offers. Settlement is recorded locally (smart contract integration required for on-chain execution).
        </p>
      </div>

      <OpenOffersList
        offers={openOffers}
        onAccept={() => {}}
        onRefresh={refresh}
        connectedAddress={address}
      />

      <div className="grid gap-6 lg:grid-cols-2">
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
