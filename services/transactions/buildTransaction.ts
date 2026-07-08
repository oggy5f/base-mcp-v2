import { parseEther } from "viem";
import {
  TransactionRequest,
  TransactionResult,
} from "./types";

export async function buildTransaction(
  request: TransactionRequest
): Promise<TransactionResult> {
  try {
    // ERC20 Transaction
    if (request.to && request.data) {
      return {
        success: true,
        message: "Transaction is ready.",
        to: request.to,
        data: request.data,
        value: BigInt(0),
      };
    }

    // Native ETH Transaction
    return {
      success: true,
      message: "Transaction is ready.",
      recipient: request.recipient,
      value: parseEther(request.amount),
    };
  } catch {
    return {
      success: false,
      message: "Invalid transaction.",
    };
  }
}