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
exports.getUniswapV3Quote = void 0;
var ethers_1 = require("ethers");
var utils_1 = require("ethers/lib/utils");
var v3_sdk_1 = require("@uniswap/v3-sdk");
var common_1 = require("@setprotocol/index-coop-contracts/utils/common");
var types_1 = require("../../types");
var constants_1 = require("../../../utils/constants");
var dependencies_1 = __importDefault(require("../../dependencies"));
var ETH_ADDRESS = dependencies_1.default.ETH_ADDRESS;
var UNI_V3_QUOTER = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
var UNI_V3_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
function getUniswapV3Quote(deployHelper, token, targetPriceImpact) {
    return __awaiter(this, void 0, void 0, function () {
        var factoryInstance, poolAddress, poolInstance, globalStorage, currentSqrtPrice, currentPrice, targetPrice, sqrtPriceLimit, quoterInstance, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, deployHelper.external.getUniswapV3FactoryInstance(UNI_V3_FACTORY)];
                case 1:
                    factoryInstance = _b.sent();
                    return [4 /*yield*/, factoryInstance.getPool(token, ETH_ADDRESS, v3_sdk_1.FeeAmount.MEDIUM)];
                case 2:
                    poolAddress = _b.sent();
                    if (poolAddress == constants_1.ADDRESS_ZERO) {
                        return [2 /*return*/, {
                                exchange: types_1.exchanges.UNISWAP_V3,
                                size: constants_1.ZERO.toString(),
                                data: "0x",
                            }];
                    }
                    return [4 /*yield*/, deployHelper.external.getUniswapV3PoolInstance(poolAddress)];
                case 3:
                    poolInstance = _b.sent();
                    return [4 /*yield*/, poolInstance.slot0()];
                case 4:
                    globalStorage = _b.sent();
                    currentSqrtPrice = globalStorage.sqrtPriceX96;
                    currentPrice = common_1.preciseDiv(ethers_1.BigNumber.from(2).pow(192), currentSqrtPrice.pow(2));
                    if (currentPrice.eq(0)) {
                        return [2 /*return*/, {
                                exchange: types_1.exchanges.UNISWAP_V3,
                                size: constants_1.ZERO.toString(),
                                data: "0x",
                            }];
                    }
                    targetPrice = token > ETH_ADDRESS ? common_1.preciseMul(currentPrice, common_1.ether(1).add(targetPriceImpact.div(50))) :
                        common_1.preciseMul(currentPrice, common_1.ether(1).sub(targetPriceImpact.div(50)));
                    sqrtPriceLimit = common_1.sqrt(common_1.preciseDiv(ethers_1.BigNumber.from(2).pow(192), targetPrice));
                    return [4 /*yield*/, deployHelper.external.getUniswapV3QuoterInstance(UNI_V3_QUOTER)];
                case 5:
                    quoterInstance = _b.sent();
                    _a = {
                        exchange: types_1.exchanges.UNISWAP_V3
                    };
                    return [4 /*yield*/, quoterInstance.callStatic.quoteExactInputSingle(ETH_ADDRESS, token, v3_sdk_1.FeeAmount.MEDIUM, common_1.ether(10000), sqrtPriceLimit)];
                case 6: return [2 /*return*/, (_a.size = (_b.sent()).toString(),
                        _a.data = utils_1.hexZeroPad(utils_1.hexlify(v3_sdk_1.FeeAmount.MEDIUM), 3),
                        _a)];
            }
        });
    });
}
exports.getUniswapV3Quote = getUniswapV3Quote;
