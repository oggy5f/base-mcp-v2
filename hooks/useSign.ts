"use client";

import { useSignMessage } from "wagmi";

export default function useSign() {
  const {
    signMessage,
    signMessageAsync,
    data,
    error,
    isPending,
    isSuccess,
  } = useSignMessage();

  return {
    signMessage,
    signMessageAsync,
    signature: data,
    error,
    isPending,
    isSuccess,
  };
}