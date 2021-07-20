import { BigNumber } from "ethers";
import { RebalanceSummary, StrategyObject } from "../../types";
import { SetToken } from "../../../utils/contracts/setV2";
export declare function calculateNewAllocations(setToken: SetToken, strategyConstants: StrategyObject, setValue: BigNumber): Promise<RebalanceSummary[]>;
export declare function calculateNewAllocationsMultisig(setToken: SetToken, strategyConstants: StrategyObject, setValue: BigNumber): Promise<RebalanceSummary[]>;
