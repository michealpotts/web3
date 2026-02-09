"use client";

import { useState } from "react";
import Image from "next/image";

const DOG_API_RANDOM = "https://dog.ceo/api/breeds/image/random";
const DOG_API_BREEDS = "https://dog.ceo/api/breeds/list";

type BreedOption = { value: string; label: string };

export default function DogPFPPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [breeds, setBreeds] = useState<BreedOption[]>([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [breedsLoaded, setBreedsLoaded] = useState(false);

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
      } else {
        setError("No image returned");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dog image");
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
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Dog PFP generator
        </h1>
        <p className="mt-2 text-zinc-400">
          Generate random dog images for profile pictures. Use any breed or random.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex-shrink-0">
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-zinc-700 bg-zinc-800 sm:h-64 sm:w-64">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                  <span className="text-sm text-zinc-500">Loading...</span>
                </div>
              )}
              {error && !loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 p-4 text-center text-sm text-red-400">
                  {error}
                </div>
              )}
              {imageUrl && !loading && (
                <Image
                  src={imageUrl}
                  alt="Dog PFP"
                  fill
                  className="object-cover"
                  unoptimized
                  sizes="256px"
                />
              )}
              {!imageUrl && !loading && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
                  No image yet
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <label className="mb-1 block text-xs text-zinc-500">
                Breed (optional)
              </label>
              <select
                value={selectedBreed}
                onChange={(e) => setSelectedBreed(e.target.value)}
                onFocus={fetchBreeds}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-white focus:border-indigo-500 focus:outline-none sm:max-w-xs"
              >
                <option value="">Random</option>
                {breeds.map((b) => (
                  <option key={b.value} value={b.value}>
                    {b.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-500 disabled:opacity-50"
              >
                {loading ? "Generating…" : "Generate dog PFP"}
              </button>
              {imageUrl && (
                <button
                  onClick={handleDownload}
                  className="rounded-lg border border-zinc-600 px-6 py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800"
                >
                  Download image
                </button>
              )}
            </div>
            <p className="text-xs text-zinc-500">
              Images from Dog CEO API. Use as profile picture or download.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
