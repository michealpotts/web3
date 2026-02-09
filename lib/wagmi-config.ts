import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

// WalletConnect projectId - get yours at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id";

export const config = getDefaultConfig({
  appName: "Web3 Identity & Rewards Hub",
  projectId,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});
