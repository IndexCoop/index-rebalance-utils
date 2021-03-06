import { preciseMul } from "@setprotocol/index-coop-contracts/dist/utils/common";
import { ZERO } from "../../../utils/constants";
import { BigNumber } from "ethers";

import { RebalanceSummary, StrategyObject } from "../../types";
import { SetToken } from "../../../utils/contracts/setV2";

import { calculateNotionalInToken, calculateNotionalInUSD } from "../../utils";

export async function calculateNewAllocations(
  setToken: SetToken,
  strategyConstants: StrategyObject,
  setValue: BigNumber,
): Promise<RebalanceSummary[]> {
  const rebalanceData: RebalanceSummary[] = [];

  const totalSupply = await setToken.totalSupply();
  for (let i = 0; i < Object.keys(strategyConstants).length; i++) {
    const key = Object.keys(strategyConstants)[i];
    const assetObj = strategyConstants[key];

    const componentValue = preciseMul(setValue, assetObj.input);
    const newUnit = assetObj.decimals.mul(componentValue).div(assetObj.price);

    const notionalInToken = calculateNotionalInToken(assetObj.currentUnit, newUnit, totalSupply);

    rebalanceData.push({
      asset: key,
      newUnit: newUnit,
      currentUnit: assetObj.currentUnit,
      notionalInToken: notionalInToken,
      notionalInUSD: calculateNotionalInUSD(notionalInToken, assetObj.decimals, assetObj.price),
      tradeCount: notionalInToken.div(assetObj.maxTradeSize).abs().add(1),
      isBuy: notionalInToken.gt(ZERO),
      exchange: assetObj.exchange,
      exchangeData: assetObj.exchangeData,
      maxTradeSize: assetObj.maxTradeSize,
      coolOffPeriod: assetObj.coolOffPeriod,
    });
  }
  return rebalanceData;
}

export async function calculateNewAllocationsMultisig(
  setToken: SetToken,
  strategyConstants: StrategyObject,
  setValue: BigNumber,
): Promise<RebalanceSummary[]> {
  const rebalanceData: RebalanceSummary[] = [];

  console.log(setValue.toString());
  const totalSupply = await setToken.totalSupply();
  for (let i = 0; i < Object.keys(strategyConstants).length; i++) {
    const key = Object.keys(strategyConstants)[i];
    const assetObj = strategyConstants[key];

    const componentValue = preciseMul(setValue, assetObj.input);
    const newUnit = assetObj.decimals.mul(componentValue).div(assetObj.price);

    const notionalInToken = calculateNotionalInToken(assetObj.currentUnit, newUnit, totalSupply);

    rebalanceData.push({
      asset: key,
      newUnit: newUnit,
      currentUnit: assetObj.currentUnit,
      notionalInToken: notionalInToken,
      notionalInUSD: calculateNotionalInUSD(notionalInToken, assetObj.decimals, assetObj.price),
      tradeCount: notionalInToken.div(assetObj.maxTradeSize).abs().add(1),
      isBuy: notionalInToken.gt(ZERO),
      exchange: assetObj.exchange,
      exchangeData: assetObj.exchangeData,
      maxTradeSize: assetObj.maxTradeSize,
      coolOffPeriod: assetObj.coolOffPeriod,
    });
  }
  return rebalanceData;
}