export type ActionType =
  | "CHAT"
  | "CHECK_BALANCE"
  | "GET_NETWORK"
  | "SEND_ETH"
  | "SEND_USDC"
  | "READ_CONTRACT"
  | "WRITE_CONTRACT"
  | "SWITCH_NETWORK"
  | "UNKNOWN";

export interface ParsedAction {
  action: ActionType;
  message: string;

  amount?: string;

  recipient?: `0x${string}`;

  token?: string;

  params?: Record<string, string>;
}