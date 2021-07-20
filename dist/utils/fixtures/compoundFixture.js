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
exports.CompoundFixture = void 0;
var deploys_1 = __importDefault(require("../deploys"));
var common_1 = require("../common");
var constants_1 = require("../constants");
var CompoundFixture = /** @class */ (function () {
    function CompoundFixture(provider, ownerAddress) {
        this._ownerAddress = ownerAddress;
        this._ownerSigner = provider.getSigner(ownerAddress);
        this._deployer = new deploys_1.default(this._ownerSigner);
    }
    CompoundFixture.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._deployer.external.deployCompoundPriceOracleMock()];
                    case 1:
                        _a.priceOracle = _j.sent();
                        // TODO - can fill with real addresses
                        _b = this;
                        return [4 /*yield*/, this._deployer.external.deployPriceOracleProxy(constants_1.ADDRESS_ZERO, this.priceOracle.address, constants_1.ADDRESS_ZERO, constants_1.ADDRESS_ZERO, constants_1.ADDRESS_ZERO, constants_1.ADDRESS_ZERO, constants_1.ADDRESS_ZERO)];
                    case 2:
                        // TODO - can fill with real addresses
                        _b.priceOracleProxy = _j.sent();
                        _c = this;
                        return [4 /*yield*/, this._deployer.external.deployUnitroller()];
                    case 3:
                        _c.unitroller = _j.sent();
                        _d = this;
                        return [4 /*yield*/, this._deployer.external.deployComptroller()];
                    case 4:
                        _d.comptroller = _j.sent();
                        return [4 /*yield*/, this.unitroller._setPendingImplementation(this.comptroller.address)];
                    case 5:
                        _j.sent();
                        return [4 /*yield*/, this.comptroller._become(this.unitroller.address, constants_1.ZERO, [], [])];
                    case 6:
                        _j.sent();
                        return [4 /*yield*/, this.comptroller._setPriceOracle(this.priceOracle.address)];
                    case 7:
                        _j.sent();
                        return [4 /*yield*/, this.comptroller._setMaxAssets(10)];
                    case 8:
                        _j.sent();
                        return [4 /*yield*/, this.comptroller._setCloseFactor(common_1.ether(0.5))];
                    case 9:
                        _j.sent();
                        return [4 /*yield*/, this.comptroller._setLiquidationIncentive(common_1.ether(1.08))];
                    case 10:
                        _j.sent();
                        // deploy Interest rate model
                        _e = this;
                        return [4 /*yield*/, this._deployer.external.deployWhitePaperInterestRateModel(common_1.ether(1), // To change
                            common_1.ether(1))];
                    case 11:
                        // deploy Interest rate model
                        _e.interestRateModel = _j.sent();
                        // Deploy COMP governance
                        _f = this;
                        return [4 /*yield*/, this._deployer.external.deployComp(this._ownerAddress)];
                    case 12:
                        // Deploy COMP governance
                        _f.comp = _j.sent();
                        return [4 /*yield*/, this.comp.transfer(this.comptroller.address, common_1.ether(400000))];
                    case 13:
                        _j.sent();
                        _g = this;
                        return [4 /*yield*/, this._deployer.external.deployCompoundTimelock(this._ownerAddress, constants_1.ONE_DAY_IN_SECONDS.mul(2))];
                    case 14:
                        _g.compoundTimelock = _j.sent();
                        _h = this;
                        return [4 /*yield*/, this._deployer.external.deployCompoundGovernorAlpha(this.compoundTimelock.address, this.comp.address, this._ownerAddress)];
                    case 15:
                        _h.compoundGovernorAlpha = _j.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CompoundFixture.prototype.createAndEnableCToken = function (underlying, initialExchangeRateMantissa, comptroller, interestRateModel, name, symbol, decimals, collateralFactor, currentPrice) {
        if (comptroller === void 0) { comptroller = this.unitroller.address; }
        if (interestRateModel === void 0) { interestRateModel = this.interestRateModel.address; }
        if (name === void 0) { name = "CToken"; }
        if (symbol === void 0) { symbol = "CT"; }
        if (decimals === void 0) { decimals = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newCToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._deployer.external.deployCERc20(underlying, comptroller, interestRateModel, initialExchangeRateMantissa, name, symbol, decimals)];
                    case 1:
                        newCToken = _a.sent();
                        return [4 /*yield*/, this.comptroller._supportMarket(newCToken.address)];
                    case 2:
                        _a.sent();
                        // Set starting price
                        return [4 /*yield*/, this.priceOracle.setUnderlyingPrice(newCToken.address, currentPrice)];
                    case 3:
                        // Set starting price
                        _a.sent();
                        // Set starting collateral factor
                        return [4 /*yield*/, this.comptroller._setCollateralFactor(newCToken.address, collateralFactor)];
                    case 4:
                        // Set starting collateral factor
                        _a.sent();
                        return [2 /*return*/, newCToken];
                }
            });
        });
    };
    CompoundFixture.prototype.createAndEnableCEther = function (initialExchangeRateMantissa, comptroller, interestRateModel, name, symbol, decimals, collateralFactor, currentPrice) {
        if (comptroller === void 0) { comptroller = this.unitroller.address; }
        if (interestRateModel === void 0) { interestRateModel = this.interestRateModel.address; }
        if (name === void 0) { name = "CEther"; }
        if (symbol === void 0) { symbol = "CETH"; }
        if (decimals === void 0) { decimals = 8; }
        return __awaiter(this, void 0, void 0, function () {
            var newCToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._deployer.external.deployCEther(comptroller, interestRateModel, initialExchangeRateMantissa, name, symbol, decimals)];
                    case 1:
                        newCToken = _a.sent();
                        return [4 /*yield*/, this.comptroller._supportMarket(newCToken.address)];
                    case 2:
                        _a.sent();
                        // Set starting price
                        return [4 /*yield*/, this.priceOracle.setUnderlyingPrice(newCToken.address, currentPrice)];
                    case 3:
                        // Set starting price
                        _a.sent();
                        // Set starting collateral factor
                        return [4 /*yield*/, this.comptroller._setCollateralFactor(newCToken.address, collateralFactor)];
                    case 4:
                        // Set starting collateral factor
                        _a.sent();
                        return [2 /*return*/, newCToken];
                }
            });
        });
    };
    return CompoundFixture;
}());
exports.CompoundFixture = CompoundFixture;
