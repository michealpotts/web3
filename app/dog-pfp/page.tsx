"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const DOG_API_RANDOM = "https://dog.ceo/api/breeds/image/random";
const DOG_API_BREEDS = "https://dog.ceo/api/breeds/list";

type BreedOption = { value: string; label: string };

const PFP_SIZES = [
  { label: "Small (128px)", value: 128 },
  { label: "Medium (256px)", value: 256 },
  { label: "Large (512px)", value: 512 },
];

export default function DogPFPPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedsLoaded, setBreedsLoaded] = useState(false);
  const [previewSize, setPreviewSize] = useState(256);
  const [recentUrls, setRecentUrls] = useState<string[]>([]);

  const fetchBreeds = async () => {
    if (breedsLoaded) return;
    try {
      const res = await fetch(DOG_API_BREEDS);
      const data = await res.json();
      if (data.message && Array.isArray(data.message)) {
        const list = data.message.map((b: string) => ({
          value: b,
          label: b.charAt(0).toUpperCase() + b.slice(1).replace(/-/g, " "),
        }));
        setBreeds(list);
        setBreedsLoaded(true);
      }
    } catch {
      setBreedsLoaded(true);
    }
  };

  const fetchDog = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = selectedBreed
        ? `https://dog.ceo/api/breed/${selectedBreed}/images/random`
        : DOG_API_RANDOM;
      const res = await fetch(url);
      const data = await res.json();
      if (data.message) {
        setImageUrl(data.message);
        setRecentUrls((prev) => [data.message, ...prev].slice(0, 6));
      } else {
        setError("No image returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch image");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = () => {
    fetchBreeds();
    fetchDog();
  };

  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `dog-pfp-${Date.now()}.jpg`;
    link.target = "_blank";
    link.rel = "noopener";
    link.click();
  };

  return (
    <div className="min-h-screen animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border border-zinc-800 animate-fade-in-up">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/40 via-zinc-900 to-fuchsia-950/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.25),transparent)]" />
        <div className="relative px-6 py-16 sm:py-20 text-center">
          <span className="inline-block rounded-full bg-violet-500/20 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-violet-300">
            Profile picture generator
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Dog PFP Studio
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
            Create unique, breed-specific or random dog avatars. Download in one click for any platform.
          </p>
        </div>
      </section>

      {/* Main generator card */}
      <div className="mt-10 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 animate-fade-in-up animate-delay-100">
          <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-black/20">
            <div className="border-b border-zinc-800 bg-zinc-800/50 px-6 py-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Preview
              </h2>
            </div>
            <div className="flex flex-col items-center justify-center p-8 sm:p-12">
              <div
                className="relative overflow-hidden rounded-2xl bg-zinc-800/50 shadow-inner ring-2 ring-zinc-700/50"
                style={{
                  width: previewSize,
                  height: previewSize,
                  maxWidth: "100%",
                }}
              >
                {loading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500 border-t-transparent" />
                  </div>
                )}
                {error && !loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-800 p-6 text-center">
                    <span className="text-red-400">{error}</span>
                    <button
                      onClick={handleGenerate}
                      className="text-sm text-violet-400 hover:text-violet-300"
                    >
                      Try again
                    </button>
                  </div>
                )}
                {imageUrl && !loading && (
                  <Image
                    src={imageUrl}
                    alt="Dog PFP"
                    width={previewSize}
                    height={previewSize}
                    className="object-cover"
                    unoptimized
                    sizes="512px"
                  />
                )}
                {!imageUrl && !loading && !error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-zinc-500">
                    <div className="rounded-full bg-zinc-700/50 p-6">
                      <svg className="h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                      </svg>
                    </div>
                    <p className="text-sm">Click Generate to create your PFP</p>
                  </div>
                )}
              </div>
              {imageUrl && (
                <p className="mt-4 text-xs text-zinc-500">
                  {previewSize}×{previewSize} preview
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6 animate-fade-in-up animate-delay-200">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
              Options
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Breed
                </label>
                <select
                  value={selectedBreed}
                  onChange={(e) => setSelectedBreed(e.target.value)}
                  onFocus={fetchBreeds}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none"
                >
                  <option value="">Random breed</option>
                  {breeds.map((b) => (
                    <option key={b.value} value={b.value}>
                      {b.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-500">
                  Preview size
                </label>
                <select
                  value={previewSize}
                  onChange={(e) => setPreviewSize(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/80 px-4 py-3 text-white focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 focus:outline-none"
                >
                  {PFP_SIZES.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition hover:bg-violet-500 disabled:opacity-50"
              >
                {loading ? "Generating…" : "Generate new PFP"}
              </button>
              {imageUrl && (
                <button
                  onClick={handleDownload}
                  className="w-full rounded-xl border border-zinc-600 py-3.5 text-sm font-medium text-zinc-300 transition hover:bg-zinc-800"
                >
                  Download image
                </button>
              )}
            </div>
            <p className="mt-4 text-xs text-zinc-500">
              Powered by Dog CEO API. Free to use for profile pictures.
            </p>
          </div>

          {recentUrls.length > 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
                Recent
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {recentUrls.map((url, i) => (
                  <button
                    key={`${url}-${i}`}
                    onClick={() => setImageUrl(url)}
                    className="relative aspect-square overflow-hidden rounded-xl border-2 border-transparent bg-zinc-800 transition hover:border-violet-500/50"
                  >
                    <Image
                      src={url}
                      alt=""
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
