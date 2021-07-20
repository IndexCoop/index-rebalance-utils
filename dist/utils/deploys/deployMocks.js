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
var ethers_1 = require("ethers");
var BaseAdapterMock__factory_1 = require("../../typechain/factories/BaseAdapterMock__factory");
var ChainlinkAggregatorV3Mock__factory_1 = require("../../typechain/factories/ChainlinkAggregatorV3Mock__factory");
var FLIStrategyExtensionMock__factory_1 = require("../../typechain/factories/FLIStrategyExtensionMock__factory");
var GovernanceAdapterMock__factory_1 = require("../../typechain/factories/GovernanceAdapterMock__factory");
var MasterChefMock__factory_1 = require("../../typechain/factories/MasterChefMock__factory");
var MutualUpgradeMock__factory_1 = require("../../typechain/factories/MutualUpgradeMock__factory");
var TradeAdapterMock__factory_1 = require("../../typechain/factories/TradeAdapterMock__factory");
var StandardTokenMock__factory_1 = require("../../typechain/factories/StandardTokenMock__factory");
var StringArrayUtilsMock__factory_1 = require("../../typechain/factories/StringArrayUtilsMock__factory");
var DeployMocks = /** @class */ (function () {
    function DeployMocks(deployerSigner) {
        this._deployerSigner = deployerSigner;
    }
    DeployMocks.prototype.deployBaseAdapterMock = function (manager) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new BaseAdapterMock__factory_1.BaseAdapterMock__factory(this._deployerSigner).deploy(manager)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployTradeAdapterMock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new TradeAdapterMock__factory_1.TradeAdapterMock__factory(this._deployerSigner).deploy()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployGovernanceAdapterMock = function (initialProposal) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new GovernanceAdapterMock__factory_1.GovernanceAdapterMock__factory(this._deployerSigner).deploy(initialProposal)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployMutualUpgradeMock = function (owner, methodologist) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new MutualUpgradeMock__factory_1.MutualUpgradeMock__factory(this._deployerSigner).deploy(owner, methodologist)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployStandardTokenMock = function (owner, decimals) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new StandardTokenMock__factory_1.StandardTokenMock__factory(this._deployerSigner).deploy(owner, ethers_1.BigNumber.from(1000000).mul(ethers_1.BigNumber.from(10).pow(decimals)), "USDCoin", "USDC", decimals)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployChainlinkAggregatorMock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new ChainlinkAggregatorV3Mock__factory_1.ChainlinkAggregatorV3Mock__factory(this._deployerSigner).deploy()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployMasterChefMock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new MasterChefMock__factory_1.MasterChefMock__factory(this._deployerSigner).deploy()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployStringArrayUtilsMock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new StringArrayUtilsMock__factory_1.StringArrayUtilsMock__factory(this._deployerSigner).deploy()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployMocks.prototype.deployFLIStrategyExtensionMock = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new FLIStrategyExtensionMock__factory_1.FLIStrategyExtensionMock__factory(this._deployerSigner).deploy()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DeployMocks;
}());
exports.default = DeployMocks;
