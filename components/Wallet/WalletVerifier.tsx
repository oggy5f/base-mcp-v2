"use client";

import { useEffect, useRef } from "react";
import { useAccount } from "wagmi";
import useSign from "@/hooks/useSign";

export default function WalletVerifier() {
  const { isConnected } = useAccount();

  const { signMessageAsync, isPending, isSuccess } = useSign();

  const hasRequested = useRef(false);

  useEffect(() => {
    async function verifyWallet() {
      if (!isConnected) {
        hasRequested.current = false;
        return;
      }

      if (hasRequested.current) {
        return;
      }

      hasRequested.current = true;

      try {
        await signMessageAsync({
          message: "Welcome to Base MCP v2",
        });

        console.log("✅ Wallet Verified");
      } catch (error) {
  console.error("❌ Wallet Verification Failed");
  console.error(error);

  if (error instanceof Error) {
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
  }

  hasRequested.current = false;
}
    }

    verifyWallet();
  }, [isConnected, signMessageAsync]);

  return (
    <>
      {isConnected && isPending && (
        <p className="text-yellow-400">
          Verifying Wallet...
        </p>
      )}

      {isConnected && isSuccess && (
        <p className="text-green-400">
          Wallet Verified ✅
        </p>
      )}
    </>
  );
}