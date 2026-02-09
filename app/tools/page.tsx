import { CryptoConverter, GasTracker, TokenChecker } from "./tools-components";

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-white sm:text-3xl">Web3 Tools</h1>
      <p className="text-zinc-400">
        Essential utilities for your Web3 journey. All data is mock for now.
      </p>

      <div className="grid gap-6 lg:grid-cols-2">
        <CryptoConverter />
        <GasTracker />
      </div>
      <TokenChecker />
    </div>
  );
}
