import { TransactionResult } from "./types";

export async function executeTransaction(
  transaction: TransactionResult
): Promise<TransactionResult> {
  if (!transaction.success) {
    return transaction;
  }

  return {
    ...transaction,
    message: "Transaction ready for wallet execution.",
  };
}