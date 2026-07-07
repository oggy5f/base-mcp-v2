"use client";

import useWallet from "@/hooks/useWallet";

export default function WalletCard() {
  const wallet = useWallet();
if (!wallet.mounted) {
  return null;
}
  return (
    <div className="w-full max-w-md rounded-xl border border-zinc-700 bg-zinc-900 p-6 text-white">
      <h2 className="text-2xl font-bold mb-6">
        Wallet
      </h2>

      <div className="space-y-4">
        <div>
          <p className="text-zinc-400">Status</p>
          <p>
            {wallet.isConnected ? "Connected" : "Not Connected"}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">Address</p>
          <p className="break-all font-mono">
            {wallet.address ?? "No Address"}
          </p>
        </div>

        <div>
          <p className="text-zinc-400">Chain ID</p>
          <p>{wallet.chainId}</p>
        </div>

        <div>
          <p className="text-zinc-400">Balance</p>
          <p>
            {wallet.balance
              ? `${wallet.balance.formatted} ${wallet.balance.symbol}`
              : "No Balance"}
          </p>
        </div>
      </div>

      {wallet.isConnected && (
        <button
          onClick={() => wallet.disconnect()}
          className="mt-6 w-full rounded-lg bg-red-600 py-3 text-white hover:bg-red-700"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}