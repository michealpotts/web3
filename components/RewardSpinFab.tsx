"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function RewardSpinFab() {
  const pathname = usePathname();
  if (pathname === "/rewards") return null;

  return (
    <Link
      href="/rewards"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-2xl shadow-lg shadow-indigo-600/30 transition hover:scale-110 hover:bg-indigo-500 animate-float"
      aria-label="Daily rewards spin"
    >
      🎡
    </Link>
  );
}
