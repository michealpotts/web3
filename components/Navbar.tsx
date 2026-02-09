"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletButton } from "./WalletButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/trade", label: "Trade" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/rewards", label: "Rewards" },
  { href: "/mint", label: "Mint" },
  { href: "/dog-pfp", label: "Dog PFP" },
  { href: "/tools", label: "Tools" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-lg font-semibold text-white hover:text-indigo-400"
        >
          Web3 Hub
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <WalletButton />

          {/* Hamburger – mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white sm:hidden"
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                mobileOpen ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-current transition ${
                mobileOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`overflow-hidden transition-all duration-200 sm:hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-zinc-800 bg-zinc-900/95 px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "bg-zinc-800 text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
