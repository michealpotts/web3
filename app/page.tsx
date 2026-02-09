import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
        Web3 Identity & Rewards Hub
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-400">
        Manage your on-chain identity, track rewards, and access essential Web3
        tools. Connect your wallet to get started.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/dashboard"
          className="rounded-lg bg-indigo-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Go to Dashboard
        </Link>
        <Link
          href="/tools"
          className="rounded-lg border border-zinc-600 px-8 py-3 text-base font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:bg-zinc-800/50"
        >
          Explore Tools
        </Link>
      </div>

      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Identity Score"
          description="Track your on-chain reputation with a unified identity score"
        />
        <FeatureCard
          title="Airdrop Tracker"
          description="Discover and claim eligible airdrops in one place"
        />
        <FeatureCard
          title="Web3 Tools"
          description="Convert, track gas, and verify token safety"
        />
      </div>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-left transition-colors hover:border-zinc-700">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
    </div>
  );
}
