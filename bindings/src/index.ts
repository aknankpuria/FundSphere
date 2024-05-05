import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  ContractClient,
  ContractClientOptions,
} from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk'
export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CDGHISQJGHUTAYZOKZEXBDH7BDJVUYPS2NLSYOAQBGOXT3DMP5X5RAF4",
  }
} as const


export interface Campaign {
  deadline: u64;
  description: string;
  image: string;
  owner: string;
  target_amount: u64;
  title: string;
}

export type DataKey = {tag: "Campaign", values: readonly [u32]} | {tag: "Funders", values: readonly [u32]} | {tag: "FundedAmount", values: readonly [u32]} | {tag: "AmountCollected", values: readonly [u32]};

export const Errors = {
  
}

export interface Client {
  /**
   * Construct and simulate a create_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  create_campaign: ({campaign}: {campaign: Campaign}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<u32>>

  /**
   * Construct and simulate a get_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_campaign: ({campaign_id}: {campaign_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Campaign>>

  /**
   * Construct and simulate a get_funded_amount transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_funded_amount: ({campaign_id}: {campaign_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<i128>>>

  /**
   * Construct and simulate a get_amount_collected transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_amount_collected: ({campaign_id}: {campaign_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<i128>>

  /**
   * Construct and simulate a get_funders transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_funders: ({campaign_id}: {campaign_id: u32}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<Array<string>>>

  /**
   * Construct and simulate a fund_to_campaign transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  fund_to_campaign: ({campaign_id, amount, from}: {campaign_id: u32, amount: i128, from: string}, options?: {
    /**
     * The fee to pay for the transaction. Default: BASE_FEE
     */
    fee?: number;

    /**
     * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
     */
    timeoutInSeconds?: number;

    /**
     * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
     */
    simulate?: boolean;
  }) => Promise<AssembledTransaction<null>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAQAAAAAAAAAAAAAACENhbXBhaWduAAAABgAAAAAAAAAIZGVhZGxpbmUAAAAGAAAAAAAAAAtkZXNjcmlwdGlvbgAAAAAQAAAAAAAAAAVpbWFnZQAAAAAAABAAAAAAAAAABW93bmVyAAAAAAAAEwAAAAAAAAANdGFyZ2V0X2Ftb3VudAAAAAAAAAYAAAAAAAAABXRpdGxlAAAAAAAAEA==",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAABAAAAAEAAAAAAAAACENhbXBhaWduAAAAAQAAAAQAAAABAAAAAAAAAAdGdW5kZXJzAAAAAAEAAAAEAAAAAQAAAAAAAAAMRnVuZGVkQW1vdW50AAAAAQAAAAQAAAABAAAAAAAAAA9BbW91bnRDb2xsZWN0ZWQAAAAAAQAAAAQ=",
        "AAAAAAAAAAAAAAAPY3JlYXRlX2NhbXBhaWduAAAAAAEAAAAAAAAACGNhbXBhaWduAAAH0AAAAAhDYW1wYWlnbgAAAAEAAAAE",
        "AAAAAAAAAAAAAAAMZ2V0X2NhbXBhaWduAAAAAQAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAEAAAfQAAAACENhbXBhaWdu",
        "AAAAAAAAAAAAAAARZ2V0X2Z1bmRlZF9hbW91bnQAAAAAAAABAAAAAAAAAAtjYW1wYWlnbl9pZAAAAAAEAAAAAQAAA+oAAAAL",
        "AAAAAAAAAAAAAAAUZ2V0X2Ftb3VudF9jb2xsZWN0ZWQAAAABAAAAAAAAAAtjYW1wYWlnbl9pZAAAAAAEAAAAAQAAAAs=",
        "AAAAAAAAAAAAAAALZ2V0X2Z1bmRlcnMAAAAAAQAAAAAAAAALY2FtcGFpZ25faWQAAAAABAAAAAEAAAPqAAAAEw==",
        "AAAAAAAAAAAAAAAQZnVuZF90b19jYW1wYWlnbgAAAAMAAAAAAAAAC2NhbXBhaWduX2lkAAAAAAQAAAAAAAAABmFtb3VudAAAAAAACwAAAAAAAAAEZnJvbQAAABMAAAAA" ]),
      options
    )
  }
  public readonly fromJSON = {
    create_campaign: this.txFromJSON<u32>,
        get_campaign: this.txFromJSON<Campaign>,
        get_funded_amount: this.txFromJSON<Array<i128>>,
        get_amount_collected: this.txFromJSON<i128>,
        get_funders: this.txFromJSON<Array<string>>,
        fund_to_campaign: this.txFromJSON<null>
  }
}