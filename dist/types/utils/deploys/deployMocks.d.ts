import { Signer, BigNumber } from "ethers";
import { Address } from "../types";
import { BaseAdapterMock, FLIStrategyExtensionMock, GovernanceAdapterMock, MutualUpgradeMock, StandardTokenMock, StringArrayUtilsMock, TradeAdapterMock } from "../contracts/index";
export default class DeployMocks {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deployBaseAdapterMock(manager: Address): Promise<BaseAdapterMock>;
    deployTradeAdapterMock(): Promise<TradeAdapterMock>;
    deployGovernanceAdapterMock(initialProposal: BigNumber): Promise<GovernanceAdapterMock>;
    deployMutualUpgradeMock(owner: Address, methodologist: string): Promise<MutualUpgradeMock>;
    deployStandardTokenMock(owner: Address, decimals: number): Promise<StandardTokenMock>;
    deployChainlinkAggregatorMock(): Promise<any>;
    deployMasterChefMock(): Promise<any>;
    deployStringArrayUtilsMock(): Promise<StringArrayUtilsMock>;
    deployFLIStrategyExtensionMock(): Promise<FLIStrategyExtensionMock>;
}
