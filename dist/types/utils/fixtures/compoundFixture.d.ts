import { JsonRpcProvider, Web3Provider } from "@ethersproject/providers";
import { BigNumberish, BigNumber } from "@ethersproject/bignumber";
import { CERc20, CEther, Comp, CompoundGovernorAlpha, CompoundTimelock, CompoundPriceOracleMock, Comptroller, PriceOracleProxy, Unitroller, WhitePaperInterestRateModel } from "../contracts/compound";
import { Address } from "../types";
export declare class CompoundFixture {
    private _deployer;
    private _ownerAddress;
    private _ownerSigner;
    unitroller: Unitroller;
    comp: Comp;
    compoundTimelock: CompoundTimelock;
    compoundGovernorAlpha: CompoundGovernorAlpha;
    comptroller: Comptroller;
    interestRateModel: WhitePaperInterestRateModel;
    priceOracle: CompoundPriceOracleMock;
    priceOracleProxy: PriceOracleProxy;
    constructor(provider: Web3Provider | JsonRpcProvider, ownerAddress: Address);
    initialize(): Promise<void>;
    createAndEnableCToken(underlying: Address, initialExchangeRateMantissa: BigNumberish, comptroller: string | undefined, interestRateModel: string | undefined, name: string | undefined, symbol: string | undefined, decimals: string | number | import("@ethersproject/bytes").Bytes | BigNumber | undefined, collateralFactor: BigNumber, currentPrice: BigNumber): Promise<CERc20>;
    createAndEnableCEther(initialExchangeRateMantissa: BigNumberish, comptroller: string | undefined, interestRateModel: string | undefined, name: string | undefined, symbol: string | undefined, decimals: string | number | import("@ethersproject/bytes").Bytes | BigNumber | undefined, collateralFactor: BigNumber, currentPrice: BigNumber): Promise<CEther>;
}
