"use client";

import { useState } from "react";

export default function useWalletVerification() {
  const [walletVerified, setWalletVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  return {
    walletVerified,
    setWalletVerified,
    isVerifying,
    setIsVerifying,
  };
}