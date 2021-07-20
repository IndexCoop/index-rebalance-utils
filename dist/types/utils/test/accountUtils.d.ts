import { BigNumber } from "@ethersproject/bignumber";
import { Account, Address } from "../types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
export declare const getAccounts: () => Promise<Account[]>;
export declare const getRandomAccount: () => Promise<Account>;
export declare const getRandomAddress: () => Promise<Address>;
export declare const getEthBalance: (account: Address) => Promise<BigNumber>;
export declare const getWallets: () => Promise<SignerWithAddress[]>;
