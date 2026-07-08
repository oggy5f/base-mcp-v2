"use client";

import { useSendTransaction } from "wagmi";

export default function useWalletTransaction() {
  const {
    sendTransactionAsync,
    data,
    error,
    isPending,
    isSuccess,
  } = useSendTransaction();

  async function sendEth(
    recipient: `0x${string}`,
    value: bigint
  ) {
    const hash = await sendTransactionAsync({
      to: recipient,
      value,
    });

    return hash;
  }

  return {
    sendEth,
    hash: data,
    error,
    isPending,
    isSuccess,
  };
}