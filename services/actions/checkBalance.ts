import { formatEther } from "viem";
import publicClient from "@/lib/publicClient";

export interface BalanceResult {
  success: boolean;
  message: string;
}

export async function checkBalance(
  address?: `0x${string}`
): Promise<BalanceResult> {
  if (!address) {
    return {
      success: false,
      message: "Wallet not connected.",
    };
  }

  try {
    const balance = await publicClient.getBalance({
      address,
    });

    return {
      success: true,
      message: `Wallet Balance: ${formatEther(balance)} ETH`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch wallet balance.",
    };
  }
}