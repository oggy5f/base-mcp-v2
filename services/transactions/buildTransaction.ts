import { parseEther } from "viem";
import {
  TransactionRequest,
  TransactionResult,
} from "./types";

export async function buildTransaction(
  request: TransactionRequest
): Promise<TransactionResult> {
  try {
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