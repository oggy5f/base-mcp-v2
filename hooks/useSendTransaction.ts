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
    return await sendTransactionAsync({
      to: recipient,
      value,
    });
  }

  async function sendContractTransaction(
    contract: `0x${string}`,
    data: `0x${string}`,
    value: bigint = BigInt(0)
  ) {
    return await sendTransactionAsync({
      to: contract,
      data,
      value,
    });
  }

  return {
    sendEth,
    sendContractTransaction,
    hash: data,
    error,
    isPending,
    isSuccess,
  };
}