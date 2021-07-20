"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategyInfo = void 0;
var bignumber_1 = require("@ethersproject/bignumber");
var common_1 = require("@setprotocol/index-coop-contracts/utils/common");
var constants_1 = require("../../../utils/constants");
var assetInfo_1 = require("../../assetInfo");
var types_1 = require("../../types");
exports.strategyInfo = {
    MANA: {
        address: assetInfo_1.ASSETS.MANA.address,
        input: common_1.ether(0.144177),
        maxTradeSize: common_1.ether(13290),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    ENJ: {
        address: assetInfo_1.ASSETS.ENJ.address,
        input: common_1.ether(0.15815),
        maxTradeSize: common_1.ether(10000),
        exchange: types_1.exchanges.UNISWAP_V3,
        exchangeData: "0x000bb8",
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    WAXE: {
        address: assetInfo_1.ASSETS.WAXE.address,
        input: common_1.ether(0.078985),
        maxTradeSize: common_1.ether(155),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    AXS: {
        address: assetInfo_1.ASSETS.AXS.address,
        input: common_1.ether(0.0797),
        maxTradeSize: common_1.ether(1000),
        exchange: types_1.exchanges.SUSHISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    SAND: {
        address: assetInfo_1.ASSETS.SAND.address,
        input: common_1.ether(0.098034),
        maxTradeSize: common_1.ether(93530),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    RFOX: {
        address: assetInfo_1.ASSETS.RFOX.address,
        input: common_1.ether(0.064476),
        maxTradeSize: common_1.ether(35000),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    AUDIO: {
        address: assetInfo_1.ASSETS.AUDIO.address,
        input: common_1.ether(0.071207),
        maxTradeSize: common_1.ether(7650),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    DG: {
        address: assetInfo_1.ASSETS.DG.address,
        input: common_1.ether(0.04328),
        maxTradeSize: common_1.ether(85),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    NFTX: {
        address: assetInfo_1.ASSETS.NFTX.address,
        input: common_1.ether(0.0489),
        maxTradeSize: common_1.ether(200),
        exchange: types_1.exchanges.SUSHISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    WHALE: {
        address: assetInfo_1.ASSETS.WHALE.address,
        input: common_1.ether(0.046276),
        maxTradeSize: common_1.ether(810),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    MEME: {
        address: assetInfo_1.ASSETS.MEME.address,
        input: common_1.ether(0.027353),
        maxTradeSize: common_1.ether(6),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    TVK: {
        address: assetInfo_1.ASSETS.TVK.address,
        input: common_1.ether(0.036381),
        maxTradeSize: common_1.ether(16100),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    RARI: {
        address: assetInfo_1.ASSETS.RARI.address,
        input: common_1.ether(0.038484),
        maxTradeSize: common_1.ether(590),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    REVV: {
        address: assetInfo_1.ASSETS.REVV.address,
        input: common_1.ether(0.032551),
        maxTradeSize: common_1.ether(39000),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
    MUSE: {
        address: assetInfo_1.ASSETS.MUSE.address,
        input: common_1.ether(0.023502),
        maxTradeSize: common_1.ether(400),
        exchange: types_1.exchanges.UNISWAP,
        coolOffPeriod: bignumber_1.BigNumber.from(900),
        currentUnit: constants_1.ZERO,
    },
};
