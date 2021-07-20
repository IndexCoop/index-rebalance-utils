"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var wallets_1 = require("./utils/wallets");
require("@nomiclabs/hardhat-waffle");
require("hardhat-typechain");
require("hardhat-deploy");
require("./tasks");
var forkingConfig = {
    url: "https://eth-mainnet.alchemyapi.io/v2/" + process.env.ALCHEMY_TOKEN,
    blockNumber: 11649166,
};
var mochaConfig = {
    grep: "@forked-network",
    invert: (process.env.FORK) ? false : true,
    timeout: (process.env.FORK) ? 50000 : 40000,
};
var config = {
    solidity: {
        version: "0.6.10",
        settings: {
            optimizer: { enabled: true, runs: 200 },
        },
    },
    namedAccounts: {
        deployer: 0,
    },
    networks: {
        hardhat: {
            forking: (process.env.FORK) ? forkingConfig : undefined,
            accounts: getHardhatPrivateKeys(),
        },
        localhost: {
            url: "http://127.0.0.1:8545",
            gas: 12000000,
            blockGasLimit: 12000000,
        },
        kovan: {
            url: "https://kovan.infura.io/v3/" + process.env.INFURA_TOKEN,
            // @ts-ignore
            accounts: ["0x" + process.env.KOVAN_DEPLOY_PRIVATE_KEY],
        },
        production: {
            url: "https://mainnet.infura.io/v3/" + process.env.INFURA_TOKEN,
            // @ts-ignore
            accounts: ["0x" + process.env.PRODUCTION_MAINNET_DEPLOY_PRIVATE_KEY],
        },
    },
    mocha: mochaConfig,
    typechain: {
        outDir: "typechain",
        target: "ethers-v5",
    },
};
function getHardhatPrivateKeys() {
    return wallets_1.privateKeys.map(function (key) {
        var TEN_MILLION_ETH = "10000000000000000000000000";
        return {
            privateKey: key,
            balance: TEN_MILLION_ETH,
        };
    });
}
exports.default = config;
