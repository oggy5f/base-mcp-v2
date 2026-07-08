import {
  erc20Abi,
  formatUnits,
} from "viem";
import publicClient from "@/lib/publicClient";
import { USDC_ADDRESS } from "./sendUsdc";

export interface TokenBalanceResult {
  success: boolean;
  message: string;
}

export async function checkTokenBalance(
  address?: `0x${string}`,
  token?: string
): Promise<TokenBalanceResult> {
  if (!address) {
    return {
      success: false,
      message: "Wallet not connected.",
    };
  }

  if (token !== "USDC") {
    return {
      success: false,
      message: "Unsupported token.",
    };
  }

  try {
    const balance = await publicClient.readContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    });

    return {
      success: true,
      message: `USDC Balance: ${formatUnits(
        balance as bigint,
        6
      )} USDC`,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to fetch token balance.",
    };
  }
}