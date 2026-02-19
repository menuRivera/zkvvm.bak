export interface IDepositData {
  commitment: string;
  amount: bigint;

  // evvm fields
  nonce: bigint;
  signature: string;
}

export interface IWithdrawData {
  proof: string;
  inputs: any[]; // todo: define inputs

  nonce: bigint;
  signature: string;
}
