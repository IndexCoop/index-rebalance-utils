"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRebalanceSchedule = void 0;
var constants_1 = require("../../utils/constants");
var assetInfo_1 = require("../assetInfo");
function createRebalanceSchedule(rebalanceData, strategyInfo) {
    var _a, _b;
    var tradeOrder = "";
    var ethBalance = constants_1.ZERO;
    var buyAssets = rebalanceData.filter(function (obj) { return obj.notionalInToken.gte(constants_1.ZERO); });
    var sellAssets = rebalanceData.filter(function (obj) { return obj.notionalInToken.lt(constants_1.ZERO); });
    var totalRounds = Object.entries(rebalanceData).map(function (_a) {
        var obj = _a[1];
        return obj.tradeCount;
    }).reduce(function (a, b) { return a.gt(b) ? a : b; }, constants_1.ZERO);
    for (var i = 0; i < totalRounds.toNumber(); i++) {
        _a = doSellTrades(sellAssets, strategyInfo, tradeOrder, ethBalance), sellAssets = _a[0], ethBalance = _a[1], tradeOrder = _a[2];
        _b = doBuyTrades(buyAssets, strategyInfo, tradeOrder, ethBalance), buyAssets = _b[0], ethBalance = _b[1], tradeOrder = _b[2];
    }
    return cleanupTrades(buyAssets, tradeOrder);
}
exports.createRebalanceSchedule = createRebalanceSchedule;
function doSellTrades(sellAssets, strategyInfo, tradeOrder, ethBalance) {
    var newEthBalance = ethBalance;
    var newTradeOrder = tradeOrder;
    for (var i = 0; i < sellAssets.length; i++) {
        if (sellAssets[i].tradeCount.gt(0)) {
            var asset = sellAssets[i].asset;
            var tradeSize = strategyInfo[asset].maxTradeSize.gt(sellAssets[i].notionalInToken.mul(-1))
                ? sellAssets[i].notionalInToken.mul(-1)
                : strategyInfo[asset].maxTradeSize;
            sellAssets[i].notionalInToken = sellAssets[i].notionalInToken.add(tradeSize);
            sellAssets[i].tradeCount = sellAssets[i].tradeCount.sub(1);
            newEthBalance = newEthBalance.add(tradeSize.mul(assetInfo_1.ASSETS[asset].price).div(assetInfo_1.ASSETS["WETH"].price));
            newTradeOrder = newTradeOrder.concat(asset.concat(","));
        }
        sellAssets[i].isBuy = false;
    }
    return [sellAssets, newEthBalance, newTradeOrder];
}
function doBuyTrades(buyAssets, strategyInfo, tradeOrder, ethBalance) {
    var newEthBalance = ethBalance;
    var newTradeOrder = tradeOrder;
    for (var i = 0; i < buyAssets.length; i++) {
        var asset = buyAssets[i].asset;
        var tradeSize = strategyInfo[asset].maxTradeSize.gt(buyAssets[i].notionalInToken)
            ? buyAssets[i].notionalInToken
            : strategyInfo[asset].maxTradeSize;
        var tradeSizeInEth = tradeSize.mul(assetInfo_1.ASSETS[asset].price).div(assetInfo_1.ASSETS["WETH"].price);
        if (buyAssets[i].tradeCount.gt(0) && tradeSizeInEth.lte(newEthBalance)) {
            buyAssets[i].notionalInToken = buyAssets[i].notionalInToken.sub(tradeSize);
            buyAssets[i].tradeCount = buyAssets[i].tradeCount.sub(1);
            newEthBalance = newEthBalance.sub(tradeSizeInEth);
            newTradeOrder = newTradeOrder.concat(asset.concat(","));
        }
        buyAssets[i].isBuy = true;
    }
    return [buyAssets, newEthBalance, newTradeOrder];
}
function cleanupTrades(buyAssets, tradeOrder) {
    var newTradeOrder = tradeOrder;
    for (var i = 0; i < buyAssets.length; i++) {
        if (buyAssets[i].tradeCount.gt(0)) {
            newTradeOrder = newTradeOrder.concat(buyAssets[i].asset.concat(","));
        }
    }
    return newTradeOrder;
}
