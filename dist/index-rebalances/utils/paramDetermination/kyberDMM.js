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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKyberDMMQuote = void 0;
var ethers_1 = require("ethers");
var sdk_1 = require("@uniswap/sdk");
var common_1 = require("@setprotocol/index-coop-contracts/utils/common");
var sdk_2 = require("@dynamic-amm/sdk");
var constants_1 = require("../../../utils/constants");
var types_1 = require("../../types");
var dependencies_1 = __importDefault(require("../../dependencies"));
var ETH_ADDRESS = dependencies_1.default.ETH_ADDRESS, BTC_ADDRESS = dependencies_1.default.BTC_ADDRESS, USDC_ADDRESS = dependencies_1.default.USDC_ADDRESS;
var KYBER_FACTORY = "0x833e4083B7ae46CeA85695c4f7ed25CDAd8886dE";
function getKyberDMMQuote(tokenAddress, targetPriceImpact) {
    return __awaiter(this, void 0, void 0, function () {
        var token, weth, wbtc, usdc, trades, _a, _b, fee, priceImpactRatio;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, sdk_2.Fetcher.fetchTokenData(sdk_1.ChainId.MAINNET, tokenAddress)];
                case 1:
                    token = _c.sent();
                    return [4 /*yield*/, sdk_2.Fetcher.fetchTokenData(sdk_1.ChainId.MAINNET, ETH_ADDRESS)];
                case 2:
                    weth = _c.sent();
                    return [4 /*yield*/, sdk_2.Fetcher.fetchTokenData(sdk_1.ChainId.MAINNET, BTC_ADDRESS)];
                case 3:
                    wbtc = _c.sent();
                    return [4 /*yield*/, sdk_2.Fetcher.fetchTokenData(sdk_1.ChainId.MAINNET, USDC_ADDRESS)];
                case 4:
                    usdc = _c.sent();
                    _b = (_a = sdk_2.Trade).bestTradeExactIn;
                    return [4 /*yield*/, getKyberDMMPairs([token, weth, wbtc, usdc])];
                case 5: return [4 /*yield*/, _b.apply(_a, [_c.sent(), new sdk_2.TokenAmount(weth, common_1.ether(1).toString()),
                        token,
                        { maxNumResults: 3, maxHops: 1 }])];
                case 6:
                    trades = _c.sent();
                    if (trades.length != 0) {
                        fee = ethers_1.BigNumber.from(trades[0].route.pairs[0].fee.toString());
                        priceImpactRatio = common_1.preciseDiv(targetPriceImpact, 
                        // Price impact measured in percent so fee must be as well
                        common_1.ether(parseFloat(trades[0].priceImpact.toSignificant(18)) - fee.toNumber() / Math.pow(10, 16)));
                        return [2 /*return*/, {
                                exchange: types_1.exchanges.KYBER,
                                size: common_1.preciseMul(common_1.ether(parseFloat(trades[0].outputAmount.toExact())).div(ethers_1.BigNumber.from(10).pow(18 - token.decimals)), priceImpactRatio).toString(),
                                data: trades[0].route.pairs[0].address,
                            }];
                    }
                    return [2 /*return*/, {
                            exchange: types_1.exchanges.KYBER,
                            size: constants_1.ZERO.toString(),
                            data: "0x",
                        }];
            }
        });
    });
}
exports.getKyberDMMQuote = getKyberDMMQuote;
function getKyberDMMPairs(tokens) {
    return __awaiter(this, void 0, void 0, function () {
        var pairs, i, j, tokenOne, tokenTwo, assetPairs, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    pairs = [];
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < tokens.length - 1)) return [3 /*break*/, 9];
                    j = 1;
                    _a.label = 2;
                case 2:
                    if (!(j < tokens.length - i - 1)) return [3 /*break*/, 8];
                    tokenOne = tokens[i];
                    tokenTwo = tokens[i + j];
                    assetPairs = void 0;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, sdk_2.Fetcher.fetchPairData(tokenOne, tokenTwo, KYBER_FACTORY)];
                case 4:
                    assetPairs = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    return [3 /*break*/, 7];
                case 6:
                    if (assetPairs.length > 0) {
                        pairs.push(assetPairs);
                    }
                    _a.label = 7;
                case 7:
                    j++;
                    return [3 /*break*/, 2];
                case 8:
                    i++;
                    return [3 /*break*/, 1];
                case 9: return [2 /*return*/, pairs];
            }
        });
    });
}
