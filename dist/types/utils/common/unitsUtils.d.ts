import { BigNumber } from "ethers/lib/ethers";
export declare const ether: (amount: number) => BigNumber;
export declare const usdc: (amount: number) => BigNumber;
export declare const bitcoin: (amount: number) => BigNumber;
export declare const gWei: (amount: number) => BigNumber;
export declare const wbtc: (amount: number) => BigNumber;
export declare const UnitsUtils: {
    usdc: (amount: number) => BigNumber;
    wbtc: (amount: number) => BigNumber;
    ether: (amount: number) => BigNumber;
    gWei: (amount: number) => BigNumber;
};
