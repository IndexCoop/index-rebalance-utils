"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlockchainUtils = void 0;
var common_1 = require("@setprotocol/index-coop-contracts/utils/common");
var hardhat_1 = require("hardhat");
var provider = hardhat_1.ethers.provider;
exports.getBlockchainUtils = function () { return new common_1.Blockchain(provider); };
