import { type ReactNode } from "react";

type CardProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition-all duration-300 hover:border-zinc-700 ${className}`}
    >
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      )}
      {children}
    </div>
  );
}
