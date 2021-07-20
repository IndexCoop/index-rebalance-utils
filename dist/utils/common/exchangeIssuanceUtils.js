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
exports.getRedeemExactSetForToken = exports.getRedeemExactSetForETH = exports.getIssueExactSetFromTokenRefund = exports.getIssueExactSetFromToken = exports.getIssueExactSetFromETH = exports.getIssueSetForExactToken = exports.getIssueSetForExactETH = exports.getAllowances = void 0;
var ethers_1 = require("ethers");
var index_1 = require("@utils/index");
var constants_1 = require("@utils/constants");
exports.getAllowances = function (tokens, owner, spenders) { return __awaiter(void 0, void 0, void 0, function () {
    var allowances;
    return __generator(this, function (_a) {
        allowances = [];
        tokens.forEach(function (token) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _b = (_a = allowances.push).apply;
                        _c = [allowances];
                        return [4 /*yield*/, Promise.all(spenders.map(function (address) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, token.allowance(owner, address)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            }); }); }))];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        return [2 /*return*/];
                }
            });
        }); });
        return [2 /*return*/, allowances];
    });
}); };
exports.getIssueSetForExactETH = function (setToken, ethInput, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var sumEth, amountEthForComponents, components, i, component, unit, amountEthForComponent, hasUniPair, uniAmount, _a, hasSushiPair, sushiAmount, _b, expectedOutput, i, component, unit, scaledEth, amountComponentOut, hasUniPair, uniAmount, _c, hasSushiPair, sushiAmount, _d, potentialSetTokenOut;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                sumEth = ethers_1.BigNumber.from(0);
                amountEthForComponents = [];
                return [4 /*yield*/, setToken.getComponents()];
            case 1:
                components = _e.sent();
                i = 0;
                _e.label = 2;
            case 2:
                if (!(i < components.length)) return [3 /*break*/, 15];
                component = components[i];
                return [4 /*yield*/, setToken.getDefaultPositionRealUnit(component)];
            case 3:
                unit = _e.sent();
                amountEthForComponent = index_1.ether(0);
                if (!(component === weth)) return [3 /*break*/, 4];
                amountEthForComponent = unit;
                return [3 /*break*/, 13];
            case 4: return [4 /*yield*/, hasPair(uniswapFactory, weth, component)];
            case 5:
                hasUniPair = _e.sent();
                if (!hasUniPair) return [3 /*break*/, 7];
                return [4 /*yield*/, uniswapRouter.getAmountsIn(unit, [weth, component])];
            case 6:
                _a = (_e.sent())[0];
                return [3 /*break*/, 8];
            case 7:
                _a = constants_1.MAX_UINT_256;
                _e.label = 8;
            case 8:
                uniAmount = _a;
                return [4 /*yield*/, hasPair(sushiswapFactory, weth, component)];
            case 9:
                hasSushiPair = _e.sent();
                if (!hasSushiPair) return [3 /*break*/, 11];
                return [4 /*yield*/, sushiswapRouter.getAmountsIn(unit, [weth, component])];
            case 10:
                _b = (_e.sent())[0];
                return [3 /*break*/, 12];
            case 11:
                _b = constants_1.MAX_UINT_256;
                _e.label = 12;
            case 12:
                sushiAmount = _b;
                amountEthForComponent = (uniAmount.lt(sushiAmount)) ? uniAmount : sushiAmount;
                _e.label = 13;
            case 13:
                amountEthForComponents.push(amountEthForComponent);
                sumEth = sumEth.add(amountEthForComponent);
                _e.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 2];
            case 15:
                expectedOutput = constants_1.MAX_UINT_256;
                i = 0;
                _e.label = 16;
            case 16:
                if (!(i < components.length)) return [3 /*break*/, 29];
                component = components[i];
                return [4 /*yield*/, setToken.getDefaultPositionRealUnit(component)];
            case 17:
                unit = _e.sent();
                scaledEth = amountEthForComponents[i].mul(ethInput).div(sumEth);
                amountComponentOut = ethers_1.BigNumber.from(0);
                if (!(component === weth)) return [3 /*break*/, 18];
                amountComponentOut = scaledEth;
                return [3 /*break*/, 27];
            case 18: return [4 /*yield*/, hasPair(uniswapFactory, weth, component)];
            case 19:
                hasUniPair = _e.sent();
                if (!hasUniPair) return [3 /*break*/, 21];
                return [4 /*yield*/, uniswapRouter.getAmountsOut(scaledEth, [weth, component])];
            case 20:
                _c = (_e.sent())[1];
                return [3 /*break*/, 22];
            case 21:
                _c = ethers_1.BigNumber.from(0);
                _e.label = 22;
            case 22:
                uniAmount = _c;
                return [4 /*yield*/, hasPair(sushiswapFactory, weth, component)];
            case 23:
                hasSushiPair = _e.sent();
                if (!hasSushiPair) return [3 /*break*/, 25];
                return [4 /*yield*/, sushiswapRouter.getAmountsOut(scaledEth, [weth, component])];
            case 24:
                _d = (_e.sent())[1];
                return [3 /*break*/, 26];
            case 25:
                _d = ethers_1.BigNumber.from(0);
                _e.label = 26;
            case 26:
                sushiAmount = _d;
                amountComponentOut = (uniAmount.gt(sushiAmount)) ? uniAmount : sushiAmount;
                _e.label = 27;
            case 27:
                potentialSetTokenOut = amountComponentOut.mul(index_1.ether(1)).div(unit);
                if (potentialSetTokenOut.lt(expectedOutput)) {
                    expectedOutput = potentialSetTokenOut;
                }
                _e.label = 28;
            case 28:
                i++;
                return [3 /*break*/, 16];
            case 29: return [2 /*return*/, expectedOutput];
        }
    });
}); };
exports.getIssueSetForExactToken = function (setToken, inputToken, inputAmount, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var ethInput, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(inputToken !== weth)) return [3 /*break*/, 2];
                return [4 /*yield*/, uniswapRouter.getAmountsOut(inputAmount, [inputToken, weth])];
            case 1:
                _a = (_b.sent())[1];
                return [3 /*break*/, 3];
            case 2:
                _a = inputAmount;
                _b.label = 3;
            case 3:
                ethInput = _a;
                return [4 /*yield*/, exports.getIssueSetForExactETH(setToken, ethInput, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth)];
            case 4: return [2 /*return*/, _b.sent()];
        }
    });
}); };
exports.getIssueExactSetFromETH = function (setToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var components, sumEth, i, componentAmount, _a, _b, ethAmount;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, setToken.getComponents()];
            case 1:
                components = _c.sent();
                sumEth = ethers_1.BigNumber.from(0);
                i = 0;
                _c.label = 2;
            case 2:
                if (!(i < components.length)) return [3 /*break*/, 6];
                _b = (_a = amountSet).mul;
                return [4 /*yield*/, setToken.getDefaultPositionRealUnit(components[i])];
            case 3:
                componentAmount = _b.apply(_a, [_c.sent()]).div(index_1.ether(1));
                return [4 /*yield*/, getInputAmountBestPrice(components[i], componentAmount, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth)];
            case 4:
                ethAmount = _c.sent();
                sumEth = sumEth.add(ethAmount);
                _c.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 2];
            case 6: return [2 /*return*/, sumEth];
        }
    });
}); };
exports.getIssueExactSetFromToken = function (setToken, inputToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var ethCost, hasUniPair, uniAmount, _a, hasSushiPair, sushiAmount, _b, tokenCost;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, exports.getIssueExactSetFromETH(setToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth)];
            case 1:
                ethCost = _c.sent();
                if (inputToken.address === weth)
                    return [2 /*return*/, ethCost];
                return [4 /*yield*/, hasPair(uniswapFactory, weth, inputToken.address)];
            case 2:
                hasUniPair = _c.sent();
                if (!hasUniPair) return [3 /*break*/, 4];
                return [4 /*yield*/, uniswapRouter.getAmountsIn(ethCost, [inputToken.address, weth])];
            case 3:
                _a = (_c.sent())[0];
                return [3 /*break*/, 5];
            case 4:
                _a = constants_1.MAX_UINT_256;
                _c.label = 5;
            case 5:
                uniAmount = _a;
                return [4 /*yield*/, hasPair(sushiswapFactory, weth, inputToken.address)];
            case 6:
                hasSushiPair = _c.sent();
                if (!hasSushiPair) return [3 /*break*/, 8];
                return [4 /*yield*/, sushiswapRouter.getAmountsIn(ethCost, [inputToken.address, weth])];
            case 7:
                _b = (_c.sent())[0];
                return [3 /*break*/, 9];
            case 8:
                _b = constants_1.MAX_UINT_256;
                _c.label = 9;
            case 9:
                sushiAmount = _b;
                tokenCost = (uniAmount.lt(sushiAmount)) ? uniAmount : sushiAmount;
                return [2 /*return*/, tokenCost];
        }
    });
}); };
exports.getIssueExactSetFromTokenRefund = function (setToken, inputToken, inputAmount, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var ethCost, inputEthValue, _a, refundAmount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, exports.getIssueExactSetFromETH(setToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth)];
            case 1:
                ethCost = _b.sent();
                if (!(inputToken.address == weth)) return [3 /*break*/, 2];
                _a = inputAmount;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, uniswapRouter.getAmountsOut(inputAmount, [inputToken.address, weth])];
            case 3:
                _a = (_b.sent())[1];
                _b.label = 4;
            case 4:
                inputEthValue = _a;
                refundAmount = inputEthValue.sub(ethCost);
                return [2 /*return*/, refundAmount];
        }
    });
}); };
exports.getRedeemExactSetForETH = function (setToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var components, sumEth, i, componentAmount, _a, _b, ethAmount, hasUniPair, uniAmount, _c, hasSushiPair, sushiAmount, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, setToken.getComponents()];
            case 1:
                components = _e.sent();
                sumEth = ethers_1.BigNumber.from(0);
                i = 0;
                _e.label = 2;
            case 2:
                if (!(i < components.length)) return [3 /*break*/, 15];
                _b = (_a = amountSet).mul;
                return [4 /*yield*/, setToken.getDefaultPositionRealUnit(components[i])];
            case 3:
                componentAmount = _b.apply(_a, [_e.sent()]).div(index_1.ether(1));
                ethAmount = ethers_1.BigNumber.from(0);
                if (!(components[i] !== weth)) return [3 /*break*/, 12];
                return [4 /*yield*/, hasPair(uniswapFactory, weth, components[i])];
            case 4:
                hasUniPair = _e.sent();
                if (!hasUniPair) return [3 /*break*/, 6];
                return [4 /*yield*/, uniswapRouter.getAmountsOut(componentAmount, [components[i], weth])];
            case 5:
                _c = (_e.sent())[1];
                return [3 /*break*/, 7];
            case 6:
                _c = ethers_1.BigNumber.from(0);
                _e.label = 7;
            case 7:
                uniAmount = _c;
                return [4 /*yield*/, hasPair(sushiswapFactory, weth, components[i])];
            case 8:
                hasSushiPair = _e.sent();
                if (!hasSushiPair) return [3 /*break*/, 10];
                return [4 /*yield*/, sushiswapRouter.getAmountsOut(componentAmount, [components[i], weth])];
            case 9:
                _d = (_e.sent())[1];
                return [3 /*break*/, 11];
            case 10:
                _d = ethers_1.BigNumber.from(0);
                _e.label = 11;
            case 11:
                sushiAmount = _d;
                ethAmount = (sushiAmount.gt(uniAmount)) ? sushiAmount : uniAmount;
                return [3 /*break*/, 13];
            case 12:
                ethAmount = componentAmount;
                _e.label = 13;
            case 13:
                sumEth = sumEth.add(ethAmount);
                _e.label = 14;
            case 14:
                i++;
                return [3 /*break*/, 2];
            case 15: return [2 /*return*/, sumEth];
        }
    });
}); };
exports.getRedeemExactSetForToken = function (setToken, outputToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var ethOut, tokenOut;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getRedeemExactSetForETH(setToken, amountSet, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth)];
            case 1:
                ethOut = _a.sent();
                if (outputToken.address === weth)
                    return [2 /*return*/, ethOut];
                return [4 /*yield*/, uniswapRouter.getAmountsOut(ethOut, [weth, outputToken.address])];
            case 2:
                tokenOut = (_a.sent())[1];
                return [2 /*return*/, tokenOut];
        }
    });
}); };
var hasPair = function (factory, tokenA, tokenB) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, factory.getPair(tokenA, tokenB)];
            case 1: return [2 /*return*/, (_a.sent()) != constants_1.ADDRESS_ZERO];
        }
    });
}); };
var getInputAmountBestPrice = function (token, amountIn, uniswapRouter, uniswapFactory, sushiswapRouter, sushiswapFactory, weth) { return __awaiter(void 0, void 0, void 0, function () {
    var hasUniPair, uniAmount, _a, hasSushiPair, sushiAmount, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!(token !== weth)) return [3 /*break*/, 9];
                return [4 /*yield*/, uniswapFactory.getPair(weth, token)];
            case 1:
                hasUniPair = (_c.sent()) != constants_1.ADDRESS_ZERO;
                if (!hasUniPair) return [3 /*break*/, 3];
                return [4 /*yield*/, uniswapRouter.getAmountsIn(amountIn, [weth, token])];
            case 2:
                _a = (_c.sent())[0];
                return [3 /*break*/, 4];
            case 3:
                _a = constants_1.MAX_UINT_256;
                _c.label = 4;
            case 4:
                uniAmount = _a;
                return [4 /*yield*/, sushiswapFactory.getPair(weth, token)];
            case 5:
                hasSushiPair = (_c.sent()) != constants_1.ADDRESS_ZERO;
                if (!hasSushiPair) return [3 /*break*/, 7];
                return [4 /*yield*/, sushiswapRouter.getAmountsIn(amountIn, [weth, token])];
            case 6:
                _b = (_c.sent())[0];
                return [3 /*break*/, 8];
            case 7:
                _b = constants_1.MAX_UINT_256;
                _c.label = 8;
            case 8:
                sushiAmount = _b;
                if (sushiAmount.lt(uniAmount)) {
                    return [2 /*return*/, sushiAmount];
                }
                else {
                    return [2 /*return*/, uniAmount];
                }
                return [3 /*break*/, 10];
            case 9: return [2 /*return*/, amountIn];
            case 10: return [2 /*return*/];
        }
    });
}); };
