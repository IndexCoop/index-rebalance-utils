"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseBalanceMap = void 0;
var balanceTree_1 = __importDefault(require("./balanceTree"));
var constants_1 = require("../constants");
function parseBalanceMap(balances) {
    var dataByAddress = balances.reduce(function (memo, _a) {
        var address = _a.address, earnings = _a.earnings;
        if (memo[address])
            throw new Error("Duplicate address: " + address);
        if (earnings.lte(0))
            throw new Error("Invalid amount for account: " + address);
        memo[address] = { amount: earnings };
        return memo;
    }, {});
    var sortedAddresses = Object.keys(dataByAddress).sort();
    // construct a tree
    var tree = new balanceTree_1.default(sortedAddresses.map(function (address) { return ({ account: address, amount: dataByAddress[address].amount }); }));
    // generate claims
    var claims = sortedAddresses.reduce(function (memo, address, index) {
        var amount = dataByAddress[address].amount;
        memo[address] = {
            index: index,
            amount: amount.toHexString(),
            proof: tree.getProof(index, address, amount),
        };
        return memo;
    }, {});
    var tokenTotal = sortedAddresses.reduce(function (memo, key) { return memo.add(dataByAddress[key].amount); }, constants_1.ZERO);
    return {
        merkleRoot: tree.getHexRoot(),
        tokenTotal: tokenTotal.toHexString(),
        claims: claims,
    };
}
exports.parseBalanceMap = parseBalanceMap;
