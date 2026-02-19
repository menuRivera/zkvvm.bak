import { IDepositData, IWithdrawData } from "@/types/zkVVM.types";
import {
  BaseService,
  HexString,
  ISigner,
  SignedAction,
  SignMethod,
} from "@evvm/evvm-js";
import { zeroAddress } from "viem";

export class zkVVM extends BaseService {
  constructor(signer: ISigner) {
    super({
      signer,
      address: `0x00`,
      abi: [], // todo: define this
      chainId: 11155111, // sepolia
    });
  }

  @SignMethod
  async deposit({
    commitment,
    amount,
    nonce,
  }: {
    commitment: string;
    amount: bigint;
    nonce: bigint;
  }): Promise<SignedAction<IDepositData>> {
    const evvmId = await this.getEvvmID();
    const functionName = "deposit";
    const hashPayload = this.buildHashPayload(functionName, {
      commitment,
      amount,
    });
    const message = this.buildMessageToSign(
      evvmId,
      hashPayload,
      zeroAddress,
      nonce,
      true,
    );

    const signature = await this.signer.signMessage(message);

    return new SignedAction(this, evvmId, functionName, {
      commitment,
      amount,
      nonce,
      signature,
    });
  }

  @SignMethod
  async withdraw({
    proof,
    recipient,
    inputs,
    nonce,
  }: {
    proof: string;
    recipient: HexString;
    inputs: any[];
    nonce: bigint;
  }): Promise<SignedAction<IWithdrawData>> {
    const evvmId = await this.getEvvmID();
    const functionName = "withdraw";
    const hashPayload = this.buildHashPayload(functionName, {
      proof,
      recipient,
    });
    const message = this.buildMessageToSign(
      evvmId,
      hashPayload,
      zeroAddress,
      nonce,
      true,
    );

    const signature = await this.signer.signMessage(message);

    return new SignedAction(this, evvmId, functionName, {
      proof,
      inputs,
      nonce,
      signature,
    });
  }
}
