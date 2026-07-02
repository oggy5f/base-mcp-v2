"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function ConnectButton() {
  const { address, isConnected } = useAccount();

  const { connect, connectors, isPending } = useConnect();

  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex flex-col gap-4 items-center">
        <p className="text-green-500 font-semibold">
          Connected
        </p>

        <p className="font-mono">
          {address?.slice(0, 6)}...
          {address?.slice(-4)}
        </p>

        <button
          onClick={() => disconnect()}
          className="rounded-lg bg-red-600 px-5 py-3"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() =>
        connect({
          connector: connectors[0],
        })
      }
      disabled={isPending}
      className="rounded-lg bg-blue-600 px-5 py-3 text-white"
    >
      {isPending ? "Connecting..." : "Connect Wallet"}
    </button>
  );
}