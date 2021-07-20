"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitsUtils = exports.wbtc = exports.gWei = exports.bitcoin = exports.usdc = exports.ether = void 0;
var ethers_1 = require("ethers");
var ethers_2 = require("ethers/lib/ethers");
exports.ether = function (amount) {
    var weiString = ethers_1.ethers.utils.parseEther(amount.toString());
    return ethers_2.BigNumber.from(weiString);
};
exports.usdc = function (amount) {
    var weiString = ethers_2.BigNumber.from("1000000").mul(amount);
    return ethers_2.BigNumber.from(weiString);
};
exports.bitcoin = function (amount) {
    var weiString = 100000000 * amount;
    return ethers_2.BigNumber.from(weiString);
};
exports.gWei = function (amount) {
    var weiString = ethers_2.BigNumber.from("1000000000").mul(amount);
    return ethers_2.BigNumber.from(weiString);
};
exports.wbtc = function (amount) {
    return ethers_2.BigNumber.from(amount).mul(ethers_2.BigNumber.from(10).pow(8));
};
exports.UnitsUtils = { usdc: exports.usdc, wbtc: exports.wbtc, ether: exports.ether, gWei: exports.gWei };
