"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";

export function WalletButton() {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className="flex items-center gap-2"
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
                  >
                    Connect Wallet
                  </button>
                );
              }
              return (
                <div className="flex items-center gap-2">
                  {chain.unsupported && (
                    <button
                      onClick={openChainModal}
                      className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white"
                    >
                      Wrong network
                    </button>
                  )}
                  <button
                    onClick={openChainModal}
                    className="flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800/50 px-3 py-2 text-sm hover:bg-zinc-800"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{ background: chain.iconBackground }}
                        className="h-4 w-4 overflow-hidden rounded-full"
                      >
                        {chain.iconUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            className="h-4 w-4"
                          />
                        )}
                      </div>
                    )}
                    <span className="hidden sm:inline">{chain.name}</span>
                  </button>
                  <button
                    onClick={openAccountModal}
                    className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2 text-sm hover:bg-zinc-700"
                  >
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
