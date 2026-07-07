"use client";

import { ParsedAction } from "@/services/parser/types";
import { checkBalance } from "@/services/actions/checkBalance";
import { getNetwork } from "@/services/actions/getNetwork";

export async function executeAction(
  action: ParsedAction,
  address?: `0x${string}`,
  chainId?: number
) {
  switch (action.action) {
    case "CHECK_BALANCE":
      return await checkBalance(address);

    case "GET_NETWORK":
      return await getNetwork(chainId);

    case "SEND_ETH":
      return {
        success: true,
        message: "Preparing transaction...",
        recipient: action.recipient,
        amount: action.amount,
      };

    default:
      return {
        success: false,
        message: "Action not implemented yet.",
      };
  }
}