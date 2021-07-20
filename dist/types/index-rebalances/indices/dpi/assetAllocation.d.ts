import { BigNumber } from "ethers";
import { RebalanceSummary, StrategyObject } from "../../types";
import { SetToken } from "../../../utils/contracts/setV2";
export declare function calculateNewAllocations(dpi: SetToken, strategyConstants: StrategyObject, dpiValue: BigNumber): Promise<RebalanceSummary[]>;
