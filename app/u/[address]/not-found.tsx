import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-2xl font-semibold text-white">Profile not found</h2>
      <p className="mt-4 max-w-md text-zinc-400">
        The address you&apos;re looking for is invalid or doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
