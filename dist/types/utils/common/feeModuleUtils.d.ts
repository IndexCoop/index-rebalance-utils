import { BigNumber } from "@ethersproject/bignumber";
import { Address } from "../types";
export declare const getStreamingFee: (feeModule: any, setToken: Address, previousAccrueTimestamp: BigNumber, recentAccrueTimestamp: BigNumber, streamingFee?: BigNumber | undefined) => Promise<BigNumber>;
export declare const getStreamingFeeInflationAmount: (inflationPercent: BigNumber, totalSupply: BigNumber) => BigNumber;
export declare const getPostFeePositionUnits: (preFeeUnits: BigNumber[], inflationPercent: BigNumber) => BigNumber[];
