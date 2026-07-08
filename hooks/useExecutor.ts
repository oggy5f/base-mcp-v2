"use client";

import { ParsedAction } from "@/services/parser/types";
import { checkBalance } from "@/services/actions/checkBalance";
import { checkTokenBalance } from "@/services/actions/checkTokenBalance";
import { getNetwork } from "@/services/actions/getNetwork";
import { sendEth } from "@/services/actions/sendEth";
import { sendUsdc } from "@/services/actions/sendUsdc";

export async function executeAction(
  action: ParsedAction,
  address?: `0x${string}`,
  chainId?: number
) {
  switch (action.action) {
    case "CHECK_BALANCE":
      return await checkBalance(address);

    case "READ_CONTRACT":
      return await checkTokenBalance(
        address,
        action.token
      );

    case "GET_NETWORK":
      return await getNetwork(chainId);

    case "SEND_ETH":
      return await sendEth(
        action.amount,
        action.recipient
      );

    case "SEND_USDC":
      return await sendUsdc(
        action.amount,
        action.recipient
      );

    default:
      return {
        success: false,
        message: "Action not implemented yet.",
      };
  }
}