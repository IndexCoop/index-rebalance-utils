import { Signer } from "ethers";
import { RebalanceReport, RebalanceSummary, StrategyInfo, StrategyObject } from "index-rebalances/types";
import { GeneralIndexModule, SetToken } from "../../utils/contracts/setV2";
export declare function createStrategyObject(setToken: SetToken, strategyInfo: StrategyInfo, owner: Signer): Promise<StrategyObject>;
export declare function generateReports(rebalanceData: RebalanceSummary[], tradeOrder: string, strategyInfo: StrategyInfo, setToken: SetToken, indexModule: GeneralIndexModule): Promise<RebalanceReport>;
export declare function writeToOutputs(report: RebalanceReport, path: string): void;
