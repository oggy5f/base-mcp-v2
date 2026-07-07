"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

export default function ConnectButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isConnected } = useAccount();

  const { connect, connectors, isPending } = useConnect();

  if (!mounted) {
    return null;
  }

  if (isConnected) {
    return null;
  }

  return (
    <button
      onClick={() =>
        connect({
          connector: connectors[0],
        })
      }
      disabled={isPending}
      className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}