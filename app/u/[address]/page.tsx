import { PublicProfile } from "./profile-components";
import { notFound } from "next/navigation";
import { isAddress } from "viem";

type PageProps = {
  params: Promise<{ address: string }>;
};

export default async function PublicProfilePage({ params }: PageProps) {
  const { address } = await params;

  if (!address || !isAddress(address)) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <PublicProfile address={address as `0x${string}`} />
    </div>
  );
}
