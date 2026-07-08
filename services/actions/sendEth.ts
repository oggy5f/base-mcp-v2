import { parseEther } from "viem";

export interface SendEthResult {
  type: "SEND_ETH";
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
      type: "SEND_ETH",
      success: false,
      message: "Amount is required.",
    };
  }

  if (!recipient) {
    return {
      type: "SEND_ETH",
      success: false,
      message: "Recipient address is required.",
    };
  }

  try {
    const value = parseEther(amount);

    return {
      type: "SEND_ETH",
      success: true,
      message: `Sending ${amount} ETH to ${recipient}`,
      value,
      recipient,
    };
  } catch {
    return {
      type: "SEND_ETH",
      success: false,
      message: "Invalid ETH amount.",
    };
  }
}