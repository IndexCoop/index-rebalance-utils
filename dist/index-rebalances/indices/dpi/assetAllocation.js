"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNewAllocations = void 0;
var common_1 = require("@setprotocol/index-coop-contracts/utils/common");
var constants_1 = require("../../../utils/constants");
var utils_1 = require("../../utils");
function calculateNewAllocations(dpi, strategyConstants, dpiValue) {
    return __awaiter(this, void 0, void 0, function () {
        var rebalanceData, sumOfCappedAllocations, cappedAssets, divisor, totalSupply, i, key, assetObj, newUnit, allocation, cappedAssetAllocationSum, i, assetObj, finalNewUnit, allocation, allocationSansCapped, additionalAllocation, finalCappedAllocation, currentUnit, notionalInToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rebalanceData = [];
                    sumOfCappedAllocations = constants_1.ZERO;
                    cappedAssets = [];
                    divisor = Object.entries(strategyConstants).map(function (_a) {
                        var obj = _a[1];
                        return obj.input.mul(obj.price);
                    }).reduce(function (a, b) { return a.add(b); }, constants_1.ZERO).div(dpiValue);
                    return [4 /*yield*/, dpi.totalSupply()];
                case 1:
                    totalSupply = _a.sent();
                    for (i = 0; i < Object.keys(strategyConstants).length; i++) {
                        key = Object.keys(strategyConstants)[i];
                        assetObj = strategyConstants[key];
                        newUnit = assetObj.input.mul(constants_1.PRECISE_UNIT).div(divisor);
                        allocation = strategyConstants[key].price.mul(newUnit).div(dpiValue);
                        if (allocation.gt(common_1.ether(.25))) {
                            cappedAssets.push(key);
                            newUnit = common_1.ether(.25).mul(dpiValue).div(strategyConstants[key].price);
                            allocation = common_1.ether(.25);
                        }
                        sumOfCappedAllocations = sumOfCappedAllocations.add(allocation);
                        rebalanceData.push({
                            asset: key,
                            newUnit: newUnit,
                            currentUnit: constants_1.ZERO,
                            notionalInToken: constants_1.ZERO,
                            notionalInUSD: constants_1.ZERO,
                            tradeCount: constants_1.ZERO,
                            isBuy: undefined,
                            exchange: assetObj.exchange,
                            maxTradeSize: assetObj.maxTradeSize,
                            coolOffPeriod: assetObj.coolOffPeriod,
                        });
                    }
                    cappedAssetAllocationSum = common_1.ether(.25).mul(cappedAssets.length);
                    for (i = 0; i < rebalanceData.length; i++) {
                        assetObj = strategyConstants[rebalanceData[i].asset];
                        finalNewUnit = rebalanceData[i].newUnit;
                        if (!cappedAssets.includes(rebalanceData[i].asset)) {
                            allocation = assetObj.price.mul(rebalanceData[i].newUnit).div(dpiValue);
                            allocationSansCapped = common_1.preciseDiv(allocation, sumOfCappedAllocations.sub(cappedAssetAllocationSum));
                            additionalAllocation = common_1.preciseMul(allocationSansCapped, constants_1.PRECISE_UNIT.sub(sumOfCappedAllocations));
                            finalCappedAllocation = allocation.add(additionalAllocation);
                            finalNewUnit = finalCappedAllocation.mul(dpiValue).div(assetObj.price);
                        }
                        currentUnit = assetObj.currentUnit;
                        notionalInToken = utils_1.calculateNotionalInToken(currentUnit, finalNewUnit, totalSupply);
                        rebalanceData[i].newUnit = finalNewUnit;
                        rebalanceData[i].currentUnit = currentUnit;
                        rebalanceData[i].notionalInToken = notionalInToken;
                        rebalanceData[i].notionalInUSD = utils_1.calculateNotionalInUSD(notionalInToken, assetObj.decimals, assetObj.price);
                        rebalanceData[i].tradeCount = notionalInToken.div(assetObj.maxTradeSize).abs().add(1);
                    }
                    return [2 /*return*/, rebalanceData];
            }
        });
    });
}
exports.calculateNewAllocations = calculateNewAllocations;
