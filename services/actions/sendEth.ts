import { parseEther } from "viem";

export interface SendEthResult {
  success: boolean;
  message: string;

  value?: bigint;

  recipient?: `0x${string}`;
}

export async function sendEth(
  amount?: string,
  recipient?: `0x${string}`
): Promise<SendEthResult> {
  if (!amount) {
    return {
      success: false,
      message: "Amount is required.",
    };
  }

  if (!recipient) {
    return {
      success: false,
      message: "Recipient address is required.",
    };
  }

  try {
    const value = parseEther(amount);

    return {
      success: true,
      message: `Sending ${amount} ETH to ${recipient}`,

      value,

      recipient,
    };
  } catch {
    return {
      success: false,
      message: "Invalid ETH amount.",
    };
  }
}