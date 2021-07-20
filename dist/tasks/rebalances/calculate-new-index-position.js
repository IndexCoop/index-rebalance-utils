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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("hardhat/config");
var utils_1 = require("../../index-rebalances/utils");
var indices_1 = require("../../index-rebalances/indices");
var deploys_1 = __importDefault(require("../../utils/deploys"));
var dependencies_1 = __importDefault(require("../../index-rebalances/dependencies"));
var GENERAL_INDEX_MODULE = dependencies_1.default.GENERAL_INDEX_MODULE;
config_1.task("calculate-new-index-position", "Calculates new rebalance details for an index")
    .addParam("index", "Index having new positions calculated")
    .addParam("rebalance", "Rebalance month")
    .setAction(function (_a, hre) {
    var index = _a.index, rebalance = _a.rebalance;
    return __awaiter(void 0, void 0, void 0, function () {
        var owner, deployHelper, indexInfo, setToken, strategyConstants, setTokenValue, rebalanceData, tradeOrder, report, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, hre.ethers.getSigners()];
                case 1:
                    owner = (_d.sent())[0];
                    deployHelper = new deploys_1.default(owner);
                    indexInfo = indices_1.indices[index];
                    return [4 /*yield*/, deployHelper.setV2.getSetToken(indexInfo.address)];
                case 2:
                    setToken = _d.sent();
                    return [4 /*yield*/, utils_1.createStrategyObject(setToken, indexInfo.strategyInfo, owner)];
                case 3:
                    strategyConstants = _d.sent();
                    setTokenValue = utils_1.calculateSetValue(strategyConstants);
                    return [4 /*yield*/, indexInfo.calculateAssetAllocation(setToken, strategyConstants, setTokenValue)];
                case 4:
                    rebalanceData = _d.sent();
                    tradeOrder = utils_1.createRebalanceSchedule(rebalanceData, strategyConstants);
                    _b = utils_1.generateReports;
                    _c = [rebalanceData,
                        tradeOrder,
                        strategyConstants,
                        setToken];
                    return [4 /*yield*/, deployHelper.setV2.getGeneralIndexModule(GENERAL_INDEX_MODULE)];
                case 5: return [4 /*yield*/, _b.apply(void 0, _c.concat([_d.sent()]))];
                case 6:
                    report = _d.sent();
                    utils_1.writeToOutputs(report, indexInfo.path + rebalance);
                    return [2 /*return*/];
            }
        });
    });
});
module.exports = {};
