export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="h-10 w-48 animate-pulse rounded-lg bg-zinc-800" />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="h-80 animate-pulse rounded-xl bg-zinc-800/50 lg:col-span-2" />
        <div className="h-80 animate-pulse rounded-xl bg-zinc-800/50" />
      </div>
      <div className="h-64 animate-pulse rounded-xl bg-zinc-800/50" />
    </div>
  );
}
