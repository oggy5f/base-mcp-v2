import { ParsedAction } from "./types";

export function parseAction(message: string): ParsedAction {
  const input = message.toLowerCase().trim();

  // Check Balance
  if (
    input.includes("balance") ||
    input.includes("wallet balance")
  ) {
    return {
      action: "CHECK_BALANCE",
      message,
    };
  }

  // Get Network
  if (
    input.includes("network") ||
    input.includes("chain")
  ) {
    return {
      action: "GET_NETWORK",
      message,
    };
  }

  // Send ETH
  if (
    input.includes("send") &&
    input.includes("eth")
  ) {
    const amountMatch = message.match(/(\d+(\.\d+)?)/);

    const addressMatch = message.match(
      /(0x[a-fA-F0-9]{40})/
    );

    return {
      action: "SEND_ETH",
      message,
      amount: amountMatch?.[1],
      recipient: addressMatch?.[1] as `0x${string}` | undefined,
      token: "ETH",
    };
  }

  // Send USDC
  if (
    input.includes("send") &&
    input.includes("usdc")
  ) {
    const amountMatch = message.match(/(\d+(\.\d+)?)/);

    const addressMatch = message.match(
      /(0x[a-fA-F0-9]{40})/
    );

    return {
      action: "SEND_USDC",
      message,
      amount: amountMatch?.[1],
      recipient: addressMatch?.[1] as `0x${string}` | undefined,
      token: "USDC",
    };
  }

  // Read Contract
  if (input.includes("read contract")) {
    return {
      action: "READ_CONTRACT",
      message,
    };
  }

  // Write Contract
  if (input.includes("write contract")) {
    return {
      action: "WRITE_CONTRACT",
      message,
    };
  }

  // Switch Network
  if (input.includes("switch network")) {
    return {
      action: "SWITCH_NETWORK",
      message,
    };
  }

  // Default Chat
  return {
    action: "CHAT",
    message,
  };
}