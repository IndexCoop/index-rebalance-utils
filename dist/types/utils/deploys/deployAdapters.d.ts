import { Signer, BigNumber } from "ethers";
import { Address, ContractSettings, MethodologySettings, ExecutionSettings, IncentiveSettings, ExchangeSettings } from "../types";
import { ExchangeIssuance, ExchangeIssuanceV2, FlexibleLeverageStrategyExtension, FeeSplitAdapter, GIMExtension, GovernanceAdapter, StreamingFeeSplitExtension } from "../contracts/index";
export default class DeployAdapters {
    private _deployerSigner;
    constructor(deployerSigner: Signer);
    deployFeeSplitAdapter(manager: Address, streamingFeeModule: Address, debtIssuanceModule: Address, operatorFeeSplit: BigNumber): Promise<FeeSplitAdapter>;
    deployStreamingFeeSplitExtension(manager: Address, streamingFeeModule: Address, operatorFeeSplit: BigNumber): Promise<StreamingFeeSplitExtension>;
    deployGovernanceAdapter(manager: Address, governanceModule: Address): Promise<GovernanceAdapter>;
    deployGIMExtension(manager: Address, generalIndexModule: Address): Promise<GIMExtension>;
    deployFlexibleLeverageStrategyExtension(manager: Address, contractSettings: ContractSettings, methdologySettings: MethodologySettings, executionSettings: ExecutionSettings, incentiveSettings: IncentiveSettings, exchangeNames: string[], exchangeSettings: ExchangeSettings[]): Promise<FlexibleLeverageStrategyExtension>;
    deployExchangeIssuance(wethAddress: Address, uniFactoryAddress: Address, uniRouterAddress: Address, sushiFactoryAddress: Address, sushiRouterAddress: Address, setControllerAddress: Address, basicIssuanceModuleAddress: Address): Promise<ExchangeIssuance>;
    deployExchangeIssuanceV2(wethAddress: Address, uniFactoryAddress: Address, uniRouterAddress: Address, sushiFactoryAddress: Address, sushiRouterAddress: Address, setControllerAddress: Address, basicIssuanceModuleAddress: Address): Promise<ExchangeIssuanceV2>;
}
