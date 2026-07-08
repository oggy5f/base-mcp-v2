export interface TransactionRequest {
  recipient: `0x${string}`;
  amount: string;

  to?: `0x${string}`;
  data?: `0x${string}`;
}

export interface TransactionResult {
  success: boolean;
  message: string;

  recipient?: `0x${string}`;

  to?: `0x${string}`;

  data?: `0x${string}`;

  value?: bigint;

  hash?: `0x${string}`;

  explorer?: string;
}