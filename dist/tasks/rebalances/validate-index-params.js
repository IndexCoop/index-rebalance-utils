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
var fs = __importStar(require("fs"));
var config_1 = require("hardhat/config");
var common_1 = require("@setprotocol/index-coop-contracts/utils/common");
var indices_1 = require("../../index-rebalances/indices");
var index_1 = require("../../index-rebalances/utils/index");
var deploys_1 = __importDefault(require("../../utils/deploys"));
var dependencies_1 = __importDefault(require("../../index-rebalances/dependencies"));
var GENERAL_INDEX_MODULE = dependencies_1.default.GENERAL_INDEX_MODULE;
config_1.task("validate-index-params", "Validates on-chain params match generated params")
    .addParam("index", "Index having new positions calculated")
    .addParam("rebalance", "Rebalance month")
    .setAction(function (_a, hre) {
    var index = _a.index, rebalance = _a.rebalance;
    return __awaiter(void 0, void 0, void 0, function () {
        var owner, deployHelper, indexInfo, setToken, indexModule, filepath, expectedParams;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, hre.ethers.getSigners()];
                case 1:
                    owner = (_b.sent())[0];
                    deployHelper = new deploys_1.default(owner);
                    indexInfo = indices_1.indices[index];
                    return [4 /*yield*/, deployHelper.setV2.getSetToken(indexInfo.address)];
                case 2:
                    setToken = _b.sent();
                    return [4 /*yield*/, deployHelper.setV2.getGeneralIndexModule(GENERAL_INDEX_MODULE)];
                case 3:
                    indexModule = _b.sent();
                    filepath = indexInfo.path + (rebalance + ".json");
                    expectedParams = JSON.parse(fs.readFileSync(filepath, "utf8"));
                    // const positionMultiplier: BigNumber = await setToken.positionMultiplier();
                    // if (!positionMultiplier.eq(BigNumber.from(expectedParams.rebalanceParams.positionMultiplier))) {
                    //   throw Error("Different position multiplier used!")
                    // }
                    return [4 /*yield*/, Promise.all(expectedParams.summary.map(function (obj, i) { return __awaiter(void 0, void 0, void 0, function () {
                            var address, info, scaledMaxTradeSize, _a, _b;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        address = indexInfo.strategyInfo[obj.asset].address;
                                        return [4 /*yield*/, indexModule.executionInfo(setToken.address, address)];
                                    case 1:
                                        info = _c.sent();
                                        _a = common_1.preciseMul;
                                        _b = [indexInfo.strategyInfo[obj.asset].maxTradeSize];
                                        return [4 /*yield*/, index_1.getTokenDecimals(deployHelper, address)];
                                    case 2:
                                        scaledMaxTradeSize = _a.apply(void 0, _b.concat([_c.sent()]));
                                        if (!scaledMaxTradeSize.eq(info.maxSize)) {
                                            throw Error("Max trade size for " + obj.asset + " is wrong should be " + indexInfo.strategyInfo[obj.asset].maxTradeSize.toString() + " instead of " + info.maxSize);
                                        }
                                        if (indexInfo.strategyInfo[obj.asset].exchange != info.exchangeName) {
                                            throw Error("Exchange for " + obj.asset + " is wrong should be " + indexInfo.strategyInfo[obj.asset].exchange + " instead of " + info.exchange);
                                        }
                                        if (!indexInfo.strategyInfo[obj.asset].coolOffPeriod.eq(info.coolOffPeriod)) {
                                            throw Error("Cool off period for " + obj.asset + " is wrong should be " + indexInfo.strategyInfo[obj.asset].coolOffPeriod.toString() + " instead of " + info.coolOffPeriod);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 4:
                    // const positionMultiplier: BigNumber = await setToken.positionMultiplier();
                    // if (!positionMultiplier.eq(BigNumber.from(expectedParams.rebalanceParams.positionMultiplier))) {
                    //   throw Error("Different position multiplier used!")
                    // }
                    _b.sent();
                    console.log("All parameters verified!");
                    return [2 /*return*/];
            }
        });
    });
});
