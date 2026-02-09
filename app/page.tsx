import Link from "next/link";
import Image from "next/image";
import { TokenPriceCharts } from "@/components/TokenPriceCharts";

export default function LandingPage() {
  return (
    <div className="relative">
      {/* Full-page background */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=1920&q=85"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/85" />
      </div>

      {/* Hero – full-bleed with layered imagery */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800/50">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=90"
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/60 to-zinc-950/95" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.35),transparent_50%)]" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-6 py-28 text-center sm:py-36">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Web3 Hub
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-200 drop-shadow">
            Your on-chain identity, live prices, P2P trading, and tools in one place.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400"
            >
              Dashboard
            </Link>
            <Link
              href="/trade"
              className="rounded-xl border border-white/25 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Trade
            </Link>
            <Link
              href="/tools"
              className="rounded-xl border border-zinc-500/50 px-8 py-4 text-base font-semibold text-zinc-200 transition hover:bg-zinc-800/50"
            >
              Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Quick links – eye-catching cards */}
      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Explore
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/trade"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition hover:border-emerald-500/50"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/3]">
              <Image
                src="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&q=80"
                alt="Trade"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-lg font-semibold text-white">Trade</span>
                <p className="text-sm text-zinc-400">Spot trading with live prices</p>
              </div>
            </div>
          </Link>
          <Link
            href="/marketplace"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition hover:border-indigo-500/50"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/3]">
              <Image
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80"
                alt="Marketplace — Traditional balance scale, Bitcoin outweighs all"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-lg font-semibold text-white">Marketplace</span>
                <p className="text-sm text-zinc-400">BTC outweighs all — P2P swaps</p>
              </div>
            </div>
          </Link>
          <Link
            href="/dog-pfp"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition hover:border-violet-500/50"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/3]">
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80"
                alt="Dog PFP"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-lg font-semibold text-white">Dog PFP</span>
                <p className="text-sm text-zinc-400">Generate profile pictures</p>
              </div>
            </div>
          </Link>
          <Link
            href="/mint"
            className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 transition hover:border-amber-500/50"
          >
            <div className="relative aspect-[4/3] sm:aspect-[5/3]">
              <Image
                src="https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&q=80"
                alt="Mint"
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-lg font-semibold text-white">Mint</span>
                <p className="text-sm text-zinc-400">Custom tokens & pools</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Live token prices */}
      <section className="mt-20">
        <TokenPriceCharts />
      </section>

      {/* Feature strip with strong imagery */}
      <section className="mt-20 overflow-hidden rounded-2xl border border-zinc-800">
        <div className="grid sm:grid-cols-3">
          <div className="relative aspect-[4/3] min-h-[240px] sm:aspect-[3/2]">
            <Image
              src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&q=80"
              alt="Identity"
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-lg font-semibold text-white">Identity Score</h3>
              <p className="mt-1 text-sm text-zinc-400">
                On-chain reputation in one number
              </p>
              <Link href="/dashboard" className="mt-3 inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300">
                View dashboard →
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] min-h-[240px] sm:aspect-[3/2]">
            <Image
              src="https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&q=80"
              alt="Airdrops"
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-lg font-semibold text-white">Airdrop Tracker</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Discover and claim eligible airdrops
              </p>
              <Link href="/dashboard" className="mt-3 inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300">
                Check eligibility →
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] min-h-[240px] sm:aspect-[3/2]">
            <Image
              src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=600&q=80"
              alt="Tools"
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/95 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-lg font-semibold text-white">Web3 Tools</h3>
              <p className="mt-1 text-sm text-zinc-400">
                Convert, gas tracker, token checker
              </p>
              <Link href="/tools" className="mt-3 inline-block text-sm font-medium text-indigo-400 hover:text-indigo-300">
                Open tools →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
