"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGasToAbiMethods = void 0;
// Adds a `gas` field to the ABI function elements so that ethers doesn't
// automatically estimate gas limits on every call. Halves execution time.
// (Borrowed from hardhat-ethers/src/internal/helpers.ts)
function addGasToAbiMethods(networkConfig, abi) {
    var BigNumber = require("ethers").BigNumber;
    // Stay well under network limit b/c ethers adds a margin
    // Also need special setting logic for coverage b/c it compiles
    // before configuring the network with higher gas values.
    var gas;
    if (process.env.COVERAGE === "true") {
        var CoverageAPI = require("solidity-coverage/api");
        gas = new CoverageAPI().gasLimit;
    }
    else {
        gas = networkConfig.gas;
    }
    var gasLimit = BigNumber.from(gas).sub(1000000).toHexString();
    var modifiedAbi = [];
    for (var _i = 0, abi_1 = abi; _i < abi_1.length; _i++) {
        var abiElement = abi_1[_i];
        if (abiElement.type !== "function") {
            modifiedAbi.push(abiElement);
            continue;
        }
        modifiedAbi.push(__assign(__assign({}, abiElement), { gas: gasLimit }));
    }
    return modifiedAbi;
}
exports.addGasToAbiMethods = addGasToAbiMethods;
