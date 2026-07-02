import ConnectButton from "@/components/ConnectButton";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-5xl font-bold mb-10">
        Base MCP v2
      </h1>

      <ConnectButton />
    </main>
  );
}