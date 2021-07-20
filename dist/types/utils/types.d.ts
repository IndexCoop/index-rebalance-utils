import { ContractTransaction as ContractTransactionType, Wallet as WalletType } from "ethers";
import { BigNumber } from "@ethersproject/bignumber";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
export declare type Account = {
    address: Address;
    wallet: SignerWithAddress;
};
export declare type Address = string;
export declare type Bytes = string;
export declare type ContractTransaction = ContractTransactionType;
export declare type Wallet = WalletType;
export declare type DistributionFormat = {
    address: string;
    earnings: BigNumber;
};
export interface ContractSettings {
    setToken: Address;
    leverageModule: Address;
    comptroller: Address;
    collateralPriceOracle: Address;
    borrowPriceOracle: Address;
    targetCollateralCToken: Address;
    targetBorrowCToken: Address;
    collateralAsset: Address;
    borrowAsset: Address;
    collateralDecimalAdjustment: BigNumber;
    borrowDecimalAdjustment: BigNumber;
}
export interface MethodologySettings {
    targetLeverageRatio: BigNumber;
    minLeverageRatio: BigNumber;
    maxLeverageRatio: BigNumber;
    recenteringSpeed: BigNumber;
    rebalanceInterval: BigNumber;
}
export interface ExecutionSettings {
    unutilizedLeveragePercentage: BigNumber;
    twapCooldownPeriod: BigNumber;
    slippageTolerance: BigNumber;
}
export interface ExchangeSettings {
    twapMaxTradeSize: BigNumber;
    exchangeLastTradeTimestamp: BigNumber;
    incentivizedTwapMaxTradeSize: BigNumber;
    leverExchangeData: Bytes;
    deleverExchangeData: Bytes;
}
export interface IncentiveSettings {
    incentivizedTwapCooldownPeriod: BigNumber;
    incentivizedSlippageTolerance: BigNumber;
    etherReward: BigNumber;
    incentivizedLeverageRatio: BigNumber;
}
