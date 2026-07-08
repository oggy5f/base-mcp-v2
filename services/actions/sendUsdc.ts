import {
  encodeFunctionData,
  erc20Abi,
  parseUnits,
} from "viem";
import { resolveBasename } from "./resolveBasename";

export const USDC_ADDRESS =
  "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913" as const;

export interface SendUsdcResult {
  type: "SEND_USDC";
  success: boolean;
  message: string;
  to?: `0x${string}`;
  data?: `0x${string}`;
  value?: bigint;
}

export async function sendUsdc(
  amount?: string,
  recipient?: string
): Promise<SendUsdcResult> {
  if (!amount) {
    return {
      type: "SEND_USDC",
      success: false,
      message: "Amount is required.",
    };
  }

  if (!recipient) {
    return {
      type: "SEND_USDC",
      success: false,
      message: "Recipient address is required.",
    };
  }

  let resolvedRecipient = recipient;

  if (
    recipient.endsWith(".base") ||
    recipient.endsWith(".base.eth")
  ) {
    const resolved = await resolveBasename(recipient);

    if (!resolved.success || !resolved.address) {
      return {
        type: "SEND_USDC",
        success: false,
        message: resolved.message,
      };
    }

    resolvedRecipient = resolved.address;
  }

  try {
    const data = encodeFunctionData({
      abi: erc20Abi,
      functionName: "transfer",
      args: [
        resolvedRecipient as `0x${string}`,
        parseUnits(amount, 6),
      ],
    });

    return {
      type: "SEND_USDC",
      success: true,
      message: `Sending ${amount} USDC to ${recipient}`,
      to: USDC_ADDRESS,
      data,
      value: BigInt(0),
    };
  } catch {
    return {
      type: "SEND_USDC",
      success: false,
      message: "Invalid USDC amount.",
    };
  }
}