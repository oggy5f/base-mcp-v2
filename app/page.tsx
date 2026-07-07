import ConnectButton from "@/components/ConnectButton";
import WalletCard from "@/components/WalletCard";
import WalletVerifier from "@/components/Wallet/WalletVerifier";
import Chat from "@/components/Chat/Chat";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 bg-black text-white p-8">
      <h1 className="text-5xl font-bold">
        Base MCP v2
      </h1>

      <ConnectButton />

      <WalletCard />

     <WalletVerifier />
     <Chat />
    </main>
  );
}