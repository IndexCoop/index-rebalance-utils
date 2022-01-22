import * as _ from "lodash";

import { ether, preciseDiv, preciseMul } from "@setprotocol/index-coop-contracts/dist/utils/common";

import {
  calculateSetValue,
  calculateNotionalInToken,
  calculateNotionalInUSD
} from "./setMath";

import { ZERO, PRECISE_UNIT } from "../../utils/constants";
import { BigNumber } from "ethers";

import {
  RebalanceSummaryLight,
  StrategyObject,
  StrategyInfo,
  AssetStrategy
} from "../types";

export function getRebalanceInputs(
  currentPositions: any,
  strategyInfo: StrategyInfo,
  assets: any
) {
  const strategyConstants: StrategyObject = createStrategyObject(
    currentPositions,
    strategyInfo,
    assets
  );

  const setTokenValue = calculateSetValue(strategyConstants);

  return {
    strategyConstants,
    setTokenValue,
  };
}

// DPI allocations are a function of token market cap. Any token which would comprise more than 25%
// of the total value in the Set is "flexibly capped" at 25% of the index even though their natural
// weight would be higher
export function calculateNewDPIAllocations(
  totalSupply: BigNumber,
  strategyConstants: StrategyObject,
  dpiValue: BigNumber,
): RebalanceSummaryLight[] {
  const rebalanceData: RebalanceSummaryLight[] = [];

  let sumOfCappedAllocations = ZERO;
  let cappedAssetAllocationSum = ZERO;
  const cappedAssets: string[] = [];

  // `divisor`: the total market value of all the component tokens in the market.
  const divisor = Object.entries(strategyConstants).map(([, obj]) => {
    return obj.input.mul(obj.price);
  }).reduce((a, b) => a.add(b), ZERO).div(dpiValue);

  for (let i = 0; i < Object.keys(strategyConstants).length; i++) {
    const key = Object.keys(strategyConstants)[i];
    const assetObj = strategyConstants[key];

    let newUnit = assetObj.input.mul(PRECISE_UNIT).div(divisor);

    // `allocation`: the natural % weight a token would have in index based on its market value
    let allocation: BigNumber = strategyConstants[key].price.mul(newUnit).div(dpiValue);

    // Cap if a token's natural weight is over the flexible cap target (25%)
    if (allocation.gt(ether(.25))) {
      cappedAssets.push(key);

      // `currentAllocation`: the current % weight the component has in the index
      const currentAllocation: BigNumber = strategyConstants[key]
        .price
        .mul(strategyConstants[key].currentUnit)
        .div(dpiValue);

      // Flexible cap is the average between the current allocation and the target
      const flexibleCapAllocation = ether(.25).add(currentAllocation).div(2);

      newUnit = flexibleCapAllocation.mul(dpiValue).div(strategyConstants[key].price);
      allocation = flexibleCapAllocation;
      cappedAssetAllocationSum = cappedAssetAllocationSum.add(flexibleCapAllocation);
    }
    sumOfCappedAllocations = sumOfCappedAllocations.add(allocation);
    rebalanceData.push({
      asset: key,
      newUnit: newUnit,
      currentUnit: ZERO,
      notionalInToken: ZERO,
      notionalInUSD: ZERO,
      isBuy: undefined,
    });
  }

  for (let i = 0; i < rebalanceData.length; i++) {
    const assetObj = strategyConstants[rebalanceData[i].asset];

    let finalNewUnit: BigNumber = rebalanceData[i].newUnit;
    if (!cappedAssets.includes(rebalanceData[i].asset)) {
      const allocation: BigNumber = assetObj.price.mul(rebalanceData[i].newUnit).div(dpiValue);

      const allocationSansCapped = preciseDiv(
        allocation, sumOfCappedAllocations.sub(cappedAssetAllocationSum)
      );
      const additionalAllocation = preciseMul(
        allocationSansCapped, PRECISE_UNIT.sub(sumOfCappedAllocations)
      );

      const finalCappedAllocation = allocation.add(additionalAllocation);
      finalNewUnit = finalCappedAllocation.mul(dpiValue).div(assetObj.price);
    }

    const currentUnit = assetObj.currentUnit;
    const notionalInToken = calculateNotionalInToken(currentUnit, finalNewUnit, totalSupply);

    rebalanceData[i].newUnit = finalNewUnit;
    rebalanceData[i].currentUnit = currentUnit;
    rebalanceData[i].notionalInToken = notionalInToken;
    rebalanceData[i].notionalInUSD = calculateNotionalInUSD(
      notionalInToken,
      assetObj.decimals,
      assetObj.price
    );
  }
  return rebalanceData;
}

export function calculateNewMVIAllocations(
  totalSupply: BigNumber,
  strategyConstants: StrategyObject,
  setValue: BigNumber,
): RebalanceSummaryLight[] {
  const rebalanceData: RebalanceSummaryLight[] = [];

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
      isBuy: notionalInToken.gt(ZERO),
    });
  }
  return rebalanceData;
}

export function createStrategyObject (
  currentPositions: any,
  strategyInfo: StrategyInfo,
  assets: any
): StrategyObject {
  const strategyObject: StrategyObject = {};

  const filteredConstants = _.pick(_.merge(assets, strategyInfo), Object.keys(strategyInfo));

  const keys = Object.keys(filteredConstants);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];

    const position = currentPositions.filter((obj: any) =>
      obj.component.toLowerCase() == filteredConstants[key].address.toLowerCase()
    )[0];

    if (position) { filteredConstants[key].currentUnit = position.unit; }

    const decimals = filteredConstants[key].decimals!;

    strategyObject[key] = {} as AssetStrategy;
    strategyObject[key].address = filteredConstants[key].address;
    strategyObject[key].price = filteredConstants[key].price;
    strategyObject[key].input = filteredConstants[key].input;
    strategyObject[key].currentUnit = position ? position.unit : ZERO;
    strategyObject[key].decimals = decimals;
  }

  return strategyObject;
}
