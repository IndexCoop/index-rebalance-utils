import { BigNumber } from "@ethersproject/bignumber";
import { CEther } from "@typechain/CEther";
import { SetToken } from "@typechain/SetToken";
export declare function calculateNewLeverageRatio(currentLeverageRatio: BigNumber, targetLeverageRatio: BigNumber, minLeverageRatio: BigNumber, maxLeverageRatio: BigNumber, recenteringSpeed: BigNumber): BigNumber;
export declare function calculateCollateralRebalanceUnits(currentLeverageRatio: BigNumber, newLeverageRatio: BigNumber, collateralBalance: BigNumber, totalSupply: BigNumber): BigNumber;
export declare function calculateTotalRebalanceNotional(setToken: SetToken, cEther: CEther, currentLeverageRatio: BigNumber, newLeverageRatio: BigNumber): Promise<BigNumber>;
export declare function calculateMaxBorrowForDelever(collateralBalance: BigNumber, collateralFactor: BigNumber, unutilizedLeveragePercentage: BigNumber, collateralPrice: BigNumber, borrowPrice: BigNumber, borrowBalance: BigNumber): BigNumber;
export declare function calculateMaxRedeemForDeleverToZero(currentLeverageRatio: BigNumber, newLeverageRatio: BigNumber, collateralBalance: BigNumber, totalSupply: BigNumber, slippageTolerance: BigNumber): BigNumber;
