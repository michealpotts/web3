import Link from "next/link";
import Image from "next/image";
import { TokenPriceCharts } from "@/components/TokenPriceCharts";

export default function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80"
            alt="Web3 blockchain background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/90 via-indigo-950/60 to-zinc-950/90" />
        </div>
        <div className="relative flex flex-col items-center justify-center px-6 py-24 text-center sm:py-32">
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
            Web3 Identity & Rewards Hub
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-zinc-300 drop-shadow">
            Manage your on-chain identity, track rewards, and access essential
            Web3 tools. Connect your wallet to get started.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/dashboard"
              className="rounded-xl bg-indigo-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-400 hover:shadow-indigo-500/40"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/tools"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur transition-all hover:bg-white/10 hover:border-white/30"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Live Token Price Charts */}
      <section className="mt-16">
        <TokenPriceCharts />
      </section>

      {/* Feature Cards */}
      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Identity Score"
          description="Track your on-chain reputation with a unified identity score"
          image="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?w=600&h=400&fit=crop"
        />
        <FeatureCard
          title="Airdrop Tracker"
          description="Discover and claim eligible airdrops in one place"
          image="https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=400&fit=crop"
        />
        <FeatureCard
          title="Web3 Tools"
          description="Convert, track gas, and verify token safety"
          image="https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&h=400&fit=crop"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/50 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-zinc-400">{description}</p>
      </div>
    </div>
  );
}
