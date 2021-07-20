"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNotionalInUSD = exports.calculateNotionalInToken = exports.calculateSetValue = void 0;
var constants_1 = require("../../utils/constants");
function calculateSetValue(strategyConstants) {
    return Object.entries(strategyConstants).map(function (_a) {
        var obj = _a[1];
        return obj.currentUnit.mul(obj.price).div(obj.decimals);
    }).reduce(function (a, b) { return a.add(b); }, constants_1.ZERO);
}
exports.calculateSetValue = calculateSetValue;
function calculateNotionalInToken(currentUnit, newUnit, totalSupply) {
    return newUnit.sub(currentUnit).mul(totalSupply).div(constants_1.PRECISE_UNIT);
}
exports.calculateNotionalInToken = calculateNotionalInToken;
function calculateNotionalInUSD(notionalInToken, tokenDecimal, tokenPrice) {
    return notionalInToken.mul(tokenPrice).div(tokenDecimal).div(constants_1.PRECISE_UNIT);
}
exports.calculateNotionalInUSD = calculateNotionalInUSD;
