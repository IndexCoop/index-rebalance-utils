"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indices = void 0;
var strategyInfo_1 = require("./dpi/strategyInfo");
var strategyInfo_2 = require("./mvi/strategyInfo");
var assetAllocation_1 = require("./dpi/assetAllocation");
var assetAllocation_2 = require("./mvi/assetAllocation");
exports.indices = {
    "DPI": {
        "address": "0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b",
        "strategyInfo": strategyInfo_1.strategyInfo,
        "path": buildPath("dpi"),
        calculateAssetAllocation: function (setToken, strategyConstants, setTokenValue) {
            return assetAllocation_1.calculateNewAllocations(setToken, strategyConstants, setTokenValue);
        },
    },
    "MVI": {
        address: "0x72e364f2abdc788b7e918bc238b21f109cd634d7",
        strategyInfo: strategyInfo_2.strategyInfo,
        path: buildPath("mvi"),
        calculateAssetAllocation: function (setToken, strategyConstants, setTokenValue) {
            return assetAllocation_2.calculateNewAllocations(setToken, strategyConstants, setTokenValue);
        },
    },
};
function buildPath(name) {
    return "index-rebalances/indices/" + name.toLowerCase() + "/rebalances/rebalance-";
}
