export interface TransactionRequest {
  recipient: `0x${string}`;
  amount: string;
}

export interface TransactionResult {
  success: boolean;
  message: string;

  recipient?: `0x${string}`;

  value?: bigint;

  hash?: `0x${string}`;

  explorer?: string;
}