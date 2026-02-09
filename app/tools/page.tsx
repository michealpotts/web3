import Image from "next/image";
import { CryptoConverter, GasTracker, TokenChecker } from "./tools-components";

export default function ToolsPage() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 animate-fade-in-up">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&q=60"
            alt=""
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/80 to-transparent" />
        </div>
        <div className="relative px-8 py-12 sm:py-16">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Web3 Tools</h1>
          <p className="mt-3 max-w-xl text-zinc-300">
            Essential utilities for your Web3 journey. Convert, track gas, and verify tokens.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 animate-fade-in-up animate-delay-100">
        <CryptoConverter />
        <GasTracker />
      </div>
      <div className="animate-fade-in-up animate-delay-200">
        <TokenChecker />
      </div>
    </div>
  );
}
