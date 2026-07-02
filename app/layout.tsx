import type { Metadata } from "next";
import "./globals.css";

import Providers from "@/providers/Providers";

export const metadata: Metadata = {
  title: "Base MCP v2",
  description: "Base MCP AI Agent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}