"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/Card";
import {
  SPIN_REWARDS,
  AVAILABLE_GIFTS,
  canSpinToday,
  setLastSpinTime,
  getNextSpinIn,
  getClaimedGifts,
  claimGift,
} from "@/lib/rewards";

export default function RewardsPage() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof SPIN_REWARDS[0] | null>(null);
  const [canSpin, setCanSpin] = useState(true);
  const [nextSpin, setNextSpin] = useState("0");
  const [claimed, setClaimed] = useState<Set<string>>(new Set());

  useEffect(() => {
    setCanSpin(canSpinToday());
    setNextSpin(getNextSpinIn());
    setClaimed(getClaimedGifts());
    const t = setInterval(() => setNextSpin(getNextSpinIn()), 60_000);
    return () => clearInterval(t);
  }, []);

  const handleSpin = () => {
    if (!canSpin || spinning) return;
    setSpinning(true);
    setResult(null);
    const duration = 3000;
    const segments = SPIN_REWARDS.length;
    const winnerIdx = Math.floor(Math.random() * segments);
    const extraRotations = 5;
    const totalRotation = 360 * extraRotations + (360 / segments) * (segments - winnerIdx);

    const wheel = document.getElementById("reward-wheel");
    if (wheel) {
      wheel.style.transition = `transform ${duration}ms cubic-bezier(0.2, 0.8, 0.2, 1)`;
      wheel.style.transform = `rotate(${totalRotation}deg)`;
    }

    setTimeout(() => {
      setResult(SPIN_REWARDS[winnerIdx]);
      setLastSpinTime();
      setCanSpin(false);
      setSpinning(false);
    }, duration);
  };

  const handleClaimGift = (id: string) => {
    claimGift(id);
    setClaimed(getClaimedGifts());
  };

  return (
    <div className="space-y-8">
      <div className="animate-fade-in-up">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Rewards</h1>
        <p className="mt-2 text-zinc-400">
          Spin daily for rewards. Claim your gifts below.
        </p>
      </div>

      {/* Daily Spin */}
      <Card title="Daily Reward Spin" className="animate-fade-in-up animate-delay-100">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
          <div className="relative">
            <div className="h-64 w-64 overflow-hidden rounded-full border-4 border-indigo-500/50 bg-zinc-900 p-2 shadow-xl">
              <div
                id="reward-wheel"
                className="h-full w-full rounded-full bg-gradient-to-br from-indigo-600 to-violet-700"
                style={{
                  background: `conic-gradient(
                    from 0deg,
                    #6366f1 0deg 45deg,
                    #8b5cf6 45deg 90deg,
                    #a855f7 90deg 135deg,
                    #6366f1 135deg 180deg,
                    #8b5cf6 180deg 225deg,
                    #a855f7 225deg 270deg,
                    #6366f1 270deg 315deg,
                    #8b5cf6 315deg 360deg
                  )`,
                  transform: "rotate(0deg)",
                }}
              />
            </div>
            <button
              onClick={handleSpin}
              disabled={!canSpin || spinning}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600"
            >
              {spinning ? "Spinning…" : canSpin ? "Spin" : `Next spin: ${nextSpin}`}
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            {result && (
              <div className="animate-gift-pop rounded-xl border border-emerald-500/50 bg-emerald-500/10 p-4">
                <p className="text-sm text-emerald-400">You won!</p>
                <p className="text-xl font-bold text-white">{result.label}</p>
              </div>
            )}
            <p className="text-sm text-zinc-500">
              Spin once per day. Prizes include points, ETH, USDC, and more.
            </p>
          </div>
        </div>
      </Card>

      {/* Gifts */}
      <Card title="Gift Center" className="animate-fade-in-up animate-delay-200">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {AVAILABLE_GIFTS.map((gift) => {
            const isClaimed = claimed.has(gift.id);
            return (
              <div
                key={gift.id}
                className={`animate-scale-in flex flex-col items-center rounded-xl border p-6 text-center transition ${
                  isClaimed
                    ? "border-zinc-700 bg-zinc-800/50 opacity-75"
                    : "border-zinc-800 bg-zinc-800/30 hover:border-indigo-500/50"
                }`}
              >
                <div
                  className={`mb-3 text-4xl ${isClaimed ? "grayscale" : "animate-bounce-subtle"}`}
                >
                  🎁
                </div>
                <h3 className="font-semibold text-white">{gift.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{gift.description}</p>
                <button
                  onClick={() => handleClaimGift(gift.id)}
                  disabled={isClaimed}
                  className="mt-4 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-400"
                >
                  {isClaimed ? "Claimed" : "Claim gift"}
                </button>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
