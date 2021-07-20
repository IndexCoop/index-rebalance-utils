"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
var _ = __importStar(require("lodash"));
var fs = __importStar(require("fs"));
var handlebars = require("handlebars");
var config_1 = require("hardhat/config");
var SetToken__factory_1 = require("../../typechain/factories/SetToken__factory");
var GeneralIndexModule__factory_1 = require("../../typechain/factories/GeneralIndexModule__factory");
var constants_1 = require("../../utils/constants");
var index_1 = require("../../utils/common/index");
var assetInfo_1 = require("../../index-rebalances/assetInfo");
var strategyInfo_1 = require("../../index-rebalances/indices/dpi/strategyInfo");
var dependencies_1 = __importDefault(require("../../index-rebalances/dependencies"));
var DPI = dependencies_1.default.DPI, GENERAL_INDEX_MODULE = dependencies_1.default.GENERAL_INDEX_MODULE;
var tradeOrder = "";
config_1.task("calculate-new-dpi-position", "Calculates new rebalance details for an index")
    .addParam("rebalance", "Rebalance month")
    .setAction(function (_a, hre) {
    var rebalance = _a.rebalance;
    return __awaiter(void 0, void 0, void 0, function () {
        var owner, dpi, indexModule, currentPositions, strategyConstants, dpiValue, divisor, rebalanceData, report, content, templateScript;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hre.ethers.getSigners()];
                case 1:
                    owner = (_b.sent())[0];
                    return [4 /*yield*/, new SetToken__factory_1.SetToken__factory(owner).attach(DPI)];
                case 2:
                    dpi = _b.sent();
                    return [4 /*yield*/, new GeneralIndexModule__factory_1.GeneralIndexModule__factory(owner).attach(GENERAL_INDEX_MODULE)];
                case 3:
                    indexModule = _b.sent();
                    return [4 /*yield*/, dpi.getPositions()];
                case 4:
                    currentPositions = _b.sent();
                    strategyConstants = createStrategyObject(currentPositions);
                    dpiValue = Object.entries(strategyConstants).map(function (_a) {
                        var obj = _a[1];
                        return obj.currentUnit.mul(obj.price);
                    }).reduce(function (a, b) { return a.add(b); }, constants_1.ZERO).div(constants_1.PRECISE_UNIT);
                    divisor = Object.entries(strategyConstants).map(function (_a) {
                        var obj = _a[1];
                        return obj.supply.mul(obj.price);
                    }).reduce(function (a, b) { return a.add(b); }, constants_1.ZERO).div(dpiValue);
                    return [4 /*yield*/, calculateNewAllocations(strategyConstants, dpiValue, divisor, dpi)];
                case 5:
                    rebalanceData = _b.sent();
                    createRebalanceSchedule(rebalanceData);
                    return [4 /*yield*/, generateReports(rebalanceData, dpi, indexModule)];
                case 6:
                    report = _b.sent();
                    content = getNamedContent("index-rebalances/dpi/rebalances/report.mustache");
                    templateScript = handlebars.compile(content);
                    fs.writeFileSync("index-rebalances/dpi/rebalances/rebalance-" + rebalance + ".txt", templateScript(report));
                    fs.writeFileSync("index-rebalances/dpi/rebalances/rebalance-" + rebalance + ".json", JSON.stringify(report));
                    return [2 /*return*/];
            }
        });
    });
});
function calculateNewAllocations(strategyConstants, dpiValue, divisor, dpi) {
    return __awaiter(this, void 0, void 0, function () {
        var rebalanceData, sumOfCappedAllocations, cappedAssets, totalSupply, i, key, assetObj, newUnit, allocation, cappedAssetAllocationSum, i, assetObj, finalNewUnit, allocation, allocationSansCapped, additionalAllocation, finalCappedAllocation, currentUnit, notionalInToken;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    rebalanceData = [];
                    sumOfCappedAllocations = constants_1.ZERO;
                    cappedAssets = [];
                    return [4 /*yield*/, dpi.totalSupply()];
                case 1:
                    totalSupply = _a.sent();
                    for (i = 0; i < Object.keys(strategyConstants).length; i++) {
                        key = Object.keys(strategyConstants)[i];
                        assetObj = strategyConstants[key];
                        newUnit = assetObj.supply.mul(constants_1.PRECISE_UNIT).div(divisor);
                        allocation = strategyConstants[key].price.mul(newUnit).div(dpiValue);
                        if (allocation.gt(index_1.ether(.25))) {
                            cappedAssets.push(key);
                            newUnit = index_1.ether(.25).mul(dpiValue).div(strategyConstants[key].price);
                            allocation = index_1.ether(.25);
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
                    cappedAssetAllocationSum = index_1.ether(.25).mul(cappedAssets.length);
                    for (i = 0; i < rebalanceData.length; i++) {
                        assetObj = strategyConstants[rebalanceData[i].asset];
                        finalNewUnit = rebalanceData[i].newUnit;
                        if (!cappedAssets.includes(rebalanceData[i].asset)) {
                            allocation = assetObj.price.mul(rebalanceData[i].newUnit).div(dpiValue);
                            allocationSansCapped = index_1.preciseDiv(allocation, sumOfCappedAllocations.sub(cappedAssetAllocationSum));
                            additionalAllocation = index_1.preciseMul(allocationSansCapped, constants_1.PRECISE_UNIT.sub(sumOfCappedAllocations));
                            finalCappedAllocation = allocation.add(additionalAllocation);
                            finalNewUnit = finalCappedAllocation.mul(dpiValue).div(assetObj.price);
                        }
                        currentUnit = assetObj.currentUnit;
                        notionalInToken = finalNewUnit.sub(currentUnit).mul(totalSupply).div(constants_1.PRECISE_UNIT);
                        rebalanceData[i].newUnit = finalNewUnit;
                        rebalanceData[i].currentUnit = currentUnit;
                        rebalanceData[i].notionalInToken = notionalInToken;
                        rebalanceData[i].notionalInUSD = notionalInToken.mul(assetObj.price).div(constants_1.PRECISE_UNIT).div(constants_1.PRECISE_UNIT);
                        rebalanceData[i].tradeCount = notionalInToken.div(assetObj.maxTradeSize).abs().add(1);
                    }
                    return [2 /*return*/, rebalanceData];
            }
        });
    });
}
function createStrategyObject(currentPositions) {
    var filteredConstants = _.pick(_.merge(assetInfo_1.assets, strategyInfo_1.strategyInfo), Object.keys(strategyInfo_1.strategyInfo));
    var keys = Object.keys(filteredConstants);
    var _loop_1 = function (i) {
        var position = currentPositions.filter(function (obj) { return obj.component.toLowerCase() == filteredConstants[keys[i]].address.toLowerCase(); })[0];
        if (position) {
            filteredConstants[keys[i]].currentUnit = position.unit;
        }
    };
    for (var i = 0; i < keys.length; i++) {
        _loop_1(i);
    }
    return filteredConstants;
}
function createRebalanceSchedule(rebalanceData) {
    var _a, _b;
    var ethBalance = constants_1.ZERO;
    var buyAssets = rebalanceData.filter(function (obj) { return obj.notionalInToken.gte(constants_1.ZERO); });
    var sellAssets = rebalanceData.filter(function (obj) { return obj.notionalInToken.lt(constants_1.ZERO); });
    var totalRounds = Object.entries(rebalanceData).map(function (_a) {
        var obj = _a[1];
        return obj.tradeCount;
    }).reduce(function (a, b) { return a.gt(b) ? a : b; }, constants_1.ZERO);
    for (var i = 0; i < totalRounds.toNumber(); i++) {
        _a = doSellTrades(sellAssets, ethBalance), sellAssets = _a[0], ethBalance = _a[1];
        _b = doBuyTrades(buyAssets, ethBalance), buyAssets = _b[0], ethBalance = _b[1];
    }
    cleanupTrades(buyAssets);
}
function doSellTrades(sellAssets, ethBalance) {
    var newEthBalance = ethBalance;
    for (var i = 0; i < sellAssets.length; i++) {
        if (sellAssets[i].tradeCount.gt(0)) {
            var asset = sellAssets[i].asset;
            var tradeSize = strategyInfo_1.strategyInfo[asset].maxTradeSize.gt(sellAssets[i].notionalInToken.mul(-1))
                ? sellAssets[i].notionalInToken.mul(-1)
                : strategyInfo_1.strategyInfo[asset].maxTradeSize;
            sellAssets[i].notionalInToken = sellAssets[i].notionalInToken.add(tradeSize);
            sellAssets[i].tradeCount = sellAssets[i].tradeCount.sub(1);
            newEthBalance = newEthBalance.add(tradeSize.mul(assetInfo_1.assets[asset].price).div(assetInfo_1.assets["WETH"].price));
            tradeOrder = tradeOrder.concat(asset.concat(","));
        }
        sellAssets[i].isBuy = false;
    }
    return [sellAssets, newEthBalance];
}
function doBuyTrades(buyAssets, ethBalance) {
    var newEthBalance = ethBalance;
    for (var i = 0; i < buyAssets.length; i++) {
        var asset = buyAssets[i].asset;
        var tradeSize = strategyInfo_1.strategyInfo[asset].maxTradeSize.gt(buyAssets[i].notionalInToken)
            ? buyAssets[i].notionalInToken
            : strategyInfo_1.strategyInfo[asset].maxTradeSize;
        var tradeSizeInEth = tradeSize.mul(assetInfo_1.assets[asset].price).div(assetInfo_1.assets["WETH"].price);
        if (buyAssets[i].tradeCount.gt(0) && tradeSizeInEth.lte(newEthBalance)) {
            buyAssets[i].notionalInToken = buyAssets[i].notionalInToken.sub(tradeSize);
            buyAssets[i].tradeCount = buyAssets[i].tradeCount.sub(1);
            newEthBalance = newEthBalance.sub(tradeSizeInEth);
            tradeOrder = tradeOrder.concat(asset.concat(","));
        }
        buyAssets[i].isBuy = true;
    }
    return [buyAssets, newEthBalance];
}
function cleanupTrades(buyAssets) {
    for (var i = 0; i < buyAssets.length; i++) {
        if (buyAssets[i].tradeCount.gt(0)) {
            tradeOrder = tradeOrder.concat(buyAssets[i].asset.concat(","));
        }
    }
}
function generateReports(rebalanceData, dpi, indexModule) {
    return __awaiter(this, void 0, void 0, function () {
        var newComponents, newComponentsTargetUnits, oldComponentsTargetUnits, i, asset, components, _loop_2, j, tradeSizeComponents, tradeSizeValue, exchangeComponents, exchangeValue, coolOffComponents, coolOffValue, totalSupply, k, positionMultiplier;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newComponents = [];
                    newComponentsTargetUnits = [];
                    oldComponentsTargetUnits = [];
                    for (i = 0; i < rebalanceData.length; i++) {
                        asset = rebalanceData[i].asset;
                        tradeOrder = tradeOrder.replace(new RegExp(asset, "g"), assetInfo_1.assets[asset].id);
                        if (rebalanceData[i].currentUnit == constants_1.ZERO) {
                            newComponents.push(assetInfo_1.assets[rebalanceData[i].asset].address);
                            newComponentsTargetUnits.push(rebalanceData[i].newUnit.toString());
                        }
                    }
                    return [4 /*yield*/, dpi.getComponents()];
                case 1:
                    components = _a.sent();
                    _loop_2 = function (j) {
                        var asset = Object.entries(assetInfo_1.assets).filter(function (_a) {
                            var key = _a[0], obj = _a[1];
                            return obj.address.toLowerCase() == components[j].toLowerCase();
                        })[0][0];
                        oldComponentsTargetUnits.push(rebalanceData.filter(function (obj) { return obj.asset == asset; })[0].newUnit.toString());
                    };
                    for (j = 0; j < components.length; j++) {
                        _loop_2(j);
                    }
                    tradeSizeComponents = [];
                    tradeSizeValue = [];
                    exchangeComponents = [];
                    exchangeValue = [];
                    coolOffComponents = [];
                    coolOffValue = [];
                    return [4 /*yield*/, Promise.all(Object.entries(strategyInfo_1.strategyInfo).map(function (_a) {
                            var key = _a[0], obj = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var address, info;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            address = obj.address;
                                            return [4 /*yield*/, indexModule.executionInfo(dpi.address, address)];
                                        case 1:
                                            info = _b.sent();
                                            if (info.maxSize.toString() != obj.maxTradeSize.toString()) {
                                                tradeSizeComponents.push(address);
                                                tradeSizeValue.push(obj.maxTradeSize.toString());
                                            }
                                            if (info.exchangeName.toString() != obj.exchange.toString()) {
                                                exchangeComponents.push(address);
                                                exchangeValue.push(obj.exchange.toString());
                                            }
                                            if (info.coolOffPeriod.toString() != obj.coolOffPeriod.toString()) {
                                                coolOffComponents.push(address);
                                                coolOffValue.push(obj.coolOffPeriod.toString());
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, dpi.totalSupply()];
                case 3:
                    totalSupply = _a.sent();
                    for (k = 0; k < rebalanceData.length; k++) {
                        rebalanceData[k].notionalInToken = rebalanceData[k].newUnit.sub(rebalanceData[k].currentUnit).mul(totalSupply).div(constants_1.PRECISE_UNIT);
                        rebalanceData[k].tradeCount = rebalanceData[k].notionalInToken.div(strategyInfo_1.strategyInfo[rebalanceData[k].asset].maxTradeSize).abs().add(1);
                    }
                    return [4 /*yield*/, dpi.positionMultiplier()];
                case 4:
                    positionMultiplier = (_a.sent()).toString();
                    return [2 /*return*/, {
                            summary: rebalanceData,
                            maxTradeSizeParams: {
                                components: tradeSizeComponents,
                                values: tradeSizeValue,
                                data: indexModule.interface.encodeFunctionData("setTradeMaximums", [DPI, tradeSizeComponents, tradeSizeValue]),
                            },
                            exchangeParams: {
                                components: exchangeComponents,
                                values: exchangeValue,
                                data: indexModule.interface.encodeFunctionData("setExchanges", [DPI, exchangeComponents, exchangeValue]),
                            },
                            coolOffPeriodParams: {
                                components: coolOffComponents,
                                values: coolOffValue,
                                data: indexModule.interface.encodeFunctionData("setCoolOffPeriods", [DPI, coolOffComponents, coolOffValue]),
                            },
                            rebalanceParams: {
                                newComponents: newComponents,
                                newComponentUnits: newComponentsTargetUnits,
                                oldComponentUnits: oldComponentsTargetUnits,
                                positionMultiplier: positionMultiplier,
                                data: indexModule.interface.encodeFunctionData("startRebalance", [DPI, newComponents, newComponentsTargetUnits, oldComponentsTargetUnits, positionMultiplier]),
                            },
                            tradeOrder: tradeOrder,
                        }];
            }
        });
    });
}
function getNamedContent(filename) {
    try {
        var content = fs.readFileSync(filename).toString();
        return content;
    }
    catch (err) {
        throw new Error("Failed to read " + filename + ": " + err);
    }
}
module.exports = {};
