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
exports.writeToOutputs = exports.generateReports = exports.createStrategyObject = void 0;
var _ = __importStar(require("lodash"));
var fs = __importStar(require("fs"));
var handlebars = require("handlebars");
var assetInfo_1 = require("../assetInfo");
var constants_1 = require("../../utils/constants");
var deploys_1 = __importDefault(require("../../utils/deploys"));
var tokenHelpers_1 = require("./tokenHelpers");
function createStrategyObject(setToken, strategyInfo, owner) {
    return __awaiter(this, void 0, void 0, function () {
        var strategyObject, currentPositions, deployHelper, filteredConstants, keys, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    strategyObject = {};
                    return [4 /*yield*/, setToken.getPositions()];
                case 1:
                    currentPositions = _a.sent();
                    deployHelper = new deploys_1.default(owner);
                    filteredConstants = _.pick(_.merge(assetInfo_1.ASSETS, strategyInfo), Object.keys(strategyInfo));
                    keys = Object.keys(filteredConstants);
                    _loop_1 = function (i) {
                        var key, position, decimals;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    key = keys[i];
                                    position = currentPositions.filter(function (obj) { return obj.component.toLowerCase() == filteredConstants[key].address.toLowerCase(); })[0];
                                    if (position) {
                                        filteredConstants[key].currentUnit = position.unit;
                                    }
                                    return [4 /*yield*/, tokenHelpers_1.getTokenDecimals(deployHelper, filteredConstants[key].address)];
                                case 1:
                                    decimals = _a.sent();
                                    strategyObject[key] = {};
                                    strategyObject[key].address = filteredConstants[key].address;
                                    strategyObject[key].price = filteredConstants[key].price;
                                    strategyObject[key].maxTradeSize = filteredConstants[key].maxTradeSize.mul(decimals).div(constants_1.PRECISE_UNIT);
                                    strategyObject[key].exchange = filteredConstants[key].exchange;
                                    strategyObject[key].coolOffPeriod = filteredConstants[key].coolOffPeriod;
                                    strategyObject[key].input = filteredConstants[key].input;
                                    strategyObject[key].currentUnit = position ? position.unit : constants_1.ZERO;
                                    strategyObject[key].decimals = decimals;
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < keys.length)) return [3 /*break*/, 5];
                    return [5 /*yield**/, _loop_1(i)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, strategyObject];
            }
        });
    });
}
exports.createStrategyObject = createStrategyObject;
function generateReports(rebalanceData, tradeOrder, strategyInfo, setToken, indexModule) {
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
                        tradeOrder = tradeOrder.replace(new RegExp(asset, "g"), assetInfo_1.ASSETS[asset].id);
                        if (rebalanceData[i].currentUnit == constants_1.ZERO) {
                            newComponents.push(assetInfo_1.ASSETS[rebalanceData[i].asset].address);
                            newComponentsTargetUnits.push(rebalanceData[i].newUnit.toString());
                        }
                    }
                    return [4 /*yield*/, setToken.getComponents()];
                case 1:
                    components = _a.sent();
                    _loop_2 = function (j) {
                        var asset = Object.entries(assetInfo_1.ASSETS).filter(function (_a) {
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
                    return [4 /*yield*/, Promise.all(Object.entries(strategyInfo).map(function (_a) {
                            var key = _a[0], obj = _a[1];
                            return __awaiter(_this, void 0, void 0, function () {
                                var address, info;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            address = obj.address;
                                            return [4 /*yield*/, indexModule.executionInfo(setToken.address, address)];
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
                    return [4 /*yield*/, setToken.totalSupply()];
                case 3:
                    totalSupply = _a.sent();
                    for (k = 0; k < rebalanceData.length; k++) {
                        rebalanceData[k].notionalInToken =
                            rebalanceData[k].newUnit.sub(rebalanceData[k].currentUnit).mul(totalSupply).div(constants_1.PRECISE_UNIT);
                        rebalanceData[k].tradeCount = rebalanceData[k].notionalInToken.div(strategyInfo[rebalanceData[k].asset].maxTradeSize).abs().add(1);
                    }
                    return [4 /*yield*/, setToken.positionMultiplier()];
                case 4:
                    positionMultiplier = (_a.sent()).toString();
                    return [2 /*return*/, {
                            summary: rebalanceData,
                            maxTradeSizeParams: {
                                components: tradeSizeComponents,
                                values: tradeSizeValue,
                                data: indexModule.interface.encodeFunctionData("setTradeMaximums", [setToken.address, tradeSizeComponents, tradeSizeValue]),
                            },
                            exchangeParams: {
                                components: exchangeComponents,
                                values: exchangeValue,
                                data: indexModule.interface.encodeFunctionData("setExchanges", [setToken.address, exchangeComponents, exchangeValue]),
                            },
                            coolOffPeriodParams: {
                                components: coolOffComponents,
                                values: coolOffValue,
                                data: indexModule.interface.encodeFunctionData("setCoolOffPeriods", [setToken.address, coolOffComponents, coolOffValue]),
                            },
                            rebalanceParams: {
                                newComponents: newComponents,
                                newComponentUnits: newComponentsTargetUnits,
                                oldComponentUnits: oldComponentsTargetUnits,
                                positionMultiplier: positionMultiplier,
                                data: indexModule.interface.encodeFunctionData("startRebalance", [
                                    setToken.address,
                                    newComponents,
                                    newComponentsTargetUnits,
                                    oldComponentsTargetUnits,
                                    positionMultiplier,
                                ]),
                            },
                            tradeOrder: tradeOrder,
                        }];
            }
        });
    });
}
exports.generateReports = generateReports;
function writeToOutputs(report, path) {
    var content = getNamedContent("index-rebalances/report.mustache");
    var templateScript = handlebars.compile(content);
    fs.writeFileSync(path + ".txt", templateScript(report));
    fs.writeFileSync(path + ".json", JSON.stringify(report));
}
exports.writeToOutputs = writeToOutputs;
function getNamedContent(filename) {
    try {
        var content = fs.readFileSync(filename).toString();
        return content;
    }
    catch (err) {
        throw new Error("Failed to read " + filename + ": " + err);
    }
}
