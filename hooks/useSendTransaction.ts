"use client";

import { useSendTransaction } from "wagmi";

export default function useWalletTransaction() {
  const {
    sendTransaction,
    sendTransactionAsync,
    data,
    error,
    isPending,
    isSuccess,
  } = useSendTransaction();

  return {
    sendTransaction,
    sendTransactionAsync,
    hash: data,
    error,
    isPending,
    isSuccess,
  };
}