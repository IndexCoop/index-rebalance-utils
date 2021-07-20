import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "../utils/types";
interface AssetInfo {
    id: string;
    address: Address;
    price: BigNumber;
    supply?: BigNumber;
}
export interface Assets {
    [symbol: string]: AssetInfo;
}
export declare const ASSETS: Assets;
export {};
