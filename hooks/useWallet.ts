"use client";

import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useDisconnect,
} from "wagmi";

export default function useWallet() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { address, isConnected } = useAccount();

  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
  });

  const chainId = useChainId();

  const { disconnect } = useDisconnect();

  return {
    mounted,
    address,
    isConnected,
    chainId,
    balance: balance
      ? {
          formatted: formatUnits(balance.value, balance.decimals),
          symbol: balance.symbol,
        }
      : null,
    isBalanceLoading,
    disconnect,
  };
}