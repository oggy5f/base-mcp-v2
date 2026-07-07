import { ParsedAction } from "../parser/types";
import { checkBalance } from "../actions/checkBalance";
import { getNetwork } from "../actions/getNetwork";

export async function executeAction(
  action: ParsedAction,
  address?: `0x${string}`
) {
  switch (action.action) {
    case "CHECK_BALANCE":
      return await checkBalance(address);

    case "GET_NETWORK":
      return await getNetwork();

    case "SEND_ETH":
      return {
        success: true,
        message: "SEND_ETH action detected.",
      };

    case "SEND_USDC":
      return {
        success: true,
        message: "SEND_USDC action detected.",
      };

    case "READ_CONTRACT":
      return {
        success: true,
        message: "READ_CONTRACT action detected.",
      };

    case "WRITE_CONTRACT":
      return {
        success: true,
        message: "WRITE_CONTRACT action detected.",
      };

    case "SWITCH_NETWORK":
      return {
        success: true,
        message: "SWITCH_NETWORK action detected.",
      };

    default:
      return {
        success: false,
        message: "No blockchain action detected.",
      };
  }
}