"use client";

import { buildTransaction } from "@/services/transactions/buildTransaction";
import useWalletTransaction from "./useSendTransaction";

export default function useTransactionEngine() {
  const wallet = useWalletTransaction();

  async function send(
    recipient: `0x${string}`,
    amount: string
  ) {
    const tx = await buildTransaction({
      recipient,
      amount,
    });

    if (!tx.success || !tx.recipient || tx.value === undefined) {
      return tx;
    }

    try {
      const hash = await wallet.sendTransactionAsync({
        to: tx.recipient,
        value: tx.value,
      });

      return {
        success: true,
        message: "Transaction sent successfully.",
        hash,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Transaction rejected.",
      };
    }
  }

  return {
    send,
    wallet,
  };
}