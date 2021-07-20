import { BigNumber } from "ethers";
import { StrategyObject } from "../types";
export declare function calculateSetValue(strategyConstants: StrategyObject): BigNumber;
export declare function calculateNotionalInToken(currentUnit: BigNumber, newUnit: BigNumber, totalSupply: BigNumber): BigNumber;
export declare function calculateNotionalInUSD(notionalInToken: BigNumber, tokenDecimal: BigNumber, tokenPrice: BigNumber): BigNumber;
