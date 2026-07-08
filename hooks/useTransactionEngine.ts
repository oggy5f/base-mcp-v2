"use client";

import { buildTransaction } from "@/services/transactions/buildTransaction";
import useWalletTransaction from "./useSendTransaction";

export default function useTransactionEngine() {
  const wallet = useWalletTransaction();

  async function send(
    request: {
      recipient: `0x${string}`;
      amount: string;
      to?: `0x${string}`;
      data?: `0x${string}`;
    }
  ) {
    const tx = await buildTransaction(request);

    if (!tx.success) {
      return tx;
    }

    try {
      let hash: `0x${string}`;

      if (tx.to && tx.data) {
        hash = await wallet.sendContractTransaction(
          tx.to,
          tx.data,
          tx.value ?? BigInt(0)
        );
      } else {
        if (!tx.recipient || tx.value === undefined) {
          return {
            success: false,
            message: "Invalid transaction.",
          };
        }

        hash = await wallet.sendEth(
          tx.recipient,
          tx.value
        );
      }

      return {
        success: true,
        message: "Transaction sent successfully.",
        hash,
        explorer: `https://basescan.org/tx/${hash}`,
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