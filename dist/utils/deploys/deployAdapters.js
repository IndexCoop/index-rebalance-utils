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
var ExchangeIssuance__factory_1 = require("../../typechain/factories/ExchangeIssuance__factory");
var ExchangeIssuanceV2__factory_1 = require("../../typechain/factories/ExchangeIssuanceV2__factory");
var FeeSplitAdapter__factory_1 = require("../../typechain/factories/FeeSplitAdapter__factory");
var FlexibleLeverageStrategyExtension__factory_1 = require("../../typechain/factories/FlexibleLeverageStrategyExtension__factory");
var GIMExtension__factory_1 = require("../../typechain/factories/GIMExtension__factory");
var GovernanceAdapter__factory_1 = require("../../typechain/factories/GovernanceAdapter__factory");
var StreamingFeeSplitExtension__factory_1 = require("../../typechain/factories/StreamingFeeSplitExtension__factory");
var DeployAdapters = /** @class */ (function () {
    function DeployAdapters(deployerSigner) {
        this._deployerSigner = deployerSigner;
    }
    DeployAdapters.prototype.deployFeeSplitAdapter = function (manager, streamingFeeModule, debtIssuanceModule, operatorFeeSplit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new FeeSplitAdapter__factory_1.FeeSplitAdapter__factory(this._deployerSigner).deploy(manager, streamingFeeModule, debtIssuanceModule, operatorFeeSplit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployAdapters.prototype.deployStreamingFeeSplitExtension = function (manager, streamingFeeModule, operatorFeeSplit) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new StreamingFeeSplitExtension__factory_1.StreamingFeeSplitExtension__factory(this._deployerSigner).deploy(manager, streamingFeeModule, operatorFeeSplit)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployAdapters.prototype.deployGovernanceAdapter = function (manager, governanceModule) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new GovernanceAdapter__factory_1.GovernanceAdapter__factory(this._deployerSigner).deploy(manager, governanceModule)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployAdapters.prototype.deployGIMExtension = function (manager, generalIndexModule) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new GIMExtension__factory_1.GIMExtension__factory(this._deployerSigner).deploy(manager, generalIndexModule)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployAdapters.prototype.deployFlexibleLeverageStrategyExtension = function (manager, contractSettings, methdologySettings, executionSettings, incentiveSettings, exchangeNames, exchangeSettings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new FlexibleLeverageStrategyExtension__factory_1.FlexibleLeverageStrategyExtension__factory(this._deployerSigner).deploy(manager, contractSettings, methdologySettings, executionSettings, incentiveSettings, exchangeNames, exchangeSettings)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployAdapters.prototype.deployExchangeIssuance = function (wethAddress, uniFactoryAddress, uniRouterAddress, sushiFactoryAddress, sushiRouterAddress, setControllerAddress, basicIssuanceModuleAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new ExchangeIssuance__factory_1.ExchangeIssuance__factory(this._deployerSigner).deploy(wethAddress, uniFactoryAddress, uniRouterAddress, sushiFactoryAddress, sushiRouterAddress, setControllerAddress, basicIssuanceModuleAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DeployAdapters.prototype.deployExchangeIssuanceV2 = function (wethAddress, uniFactoryAddress, uniRouterAddress, sushiFactoryAddress, sushiRouterAddress, setControllerAddress, basicIssuanceModuleAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new ExchangeIssuanceV2__factory_1.ExchangeIssuanceV2__factory(this._deployerSigner).deploy(wethAddress, uniFactoryAddress, uniRouterAddress, sushiFactoryAddress, sushiRouterAddress, setControllerAddress, basicIssuanceModuleAddress)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DeployAdapters;
}());
exports.default = DeployAdapters;
