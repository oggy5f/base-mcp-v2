export interface NetworkResult {
  success: boolean;
  message: string;
}

export async function getNetwork(
  chainId?: number
): Promise<NetworkResult> {
  console.log("getNetwork chainId:", chainId);
  if (!chainId) {
    return {
      success: false,
      message: "Wallet not connected.",
    };
  }

  const networks: Record<number, string> = {
    1: "Ethereum Mainnet",
    8453: "Base Mainnet",
    84532: "Base Sepolia",
    137: "Polygon",
    42161: "Arbitrum One",
    10: "Optimism",
  };

  return {
    success: true,
    message: `Network: ${networks[chainId] ?? "Unknown"}\nChain ID: ${chainId}`,
  };
}