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
exports.SetFixture = void 0;
var deploys_1 = __importDefault(require("../deploys"));
var common_1 = require("../common");
var constants_1 = require("../constants");
var SetToken__factory_1 = require("../../typechain/factories/SetToken__factory");
var SetFixture = /** @class */ (function () {
    function SetFixture(provider, ownerAddress) {
        this._provider = provider;
        this._ownerAddress = ownerAddress;
        this._ownerSigner = provider.getSigner(ownerAddress);
        this._deployer = new deploys_1.default(this._ownerSigner);
    }
    SetFixture.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g, _h, modules;
            var _j;
            return __generator(this, function (_k) {
                switch (_k.label) {
                    case 0: return [4 /*yield*/, this._provider.listAccounts()];
                    case 1:
                        // Choose an arbitrary address as fee recipient
                        _j = _k.sent(), this.feeRecipient = _j[3];
                        _a = this;
                        return [4 /*yield*/, this._deployer.setV2.deployController(this.feeRecipient)];
                    case 2:
                        _a.controller = _k.sent();
                        _b = this;
                        return [4 /*yield*/, this._deployer.setV2.deployIntegrationRegistry(this.controller.address)];
                    case 3:
                        _b.integrationRegistry = _k.sent();
                        _c = this;
                        return [4 /*yield*/, this._deployer.setV2.deploySetTokenCreator(this.controller.address)];
                    case 4:
                        _c.factory = _k.sent();
                        _d = this;
                        return [4 /*yield*/, this._deployer.setV2.deployBasicIssuanceModule(this.controller.address)];
                    case 5:
                        _d.issuanceModule = _k.sent();
                        _e = this;
                        return [4 /*yield*/, this._deployer.setV2.deployStreamingFeeModule(this.controller.address)];
                    case 6:
                        _e.streamingFeeModule = _k.sent();
                        _f = this;
                        return [4 /*yield*/, this._deployer.setV2.deployDebtIssuanceModule(this.controller.address)];
                    case 7:
                        _f.debtIssuanceModule = _k.sent();
                        _g = this;
                        return [4 /*yield*/, this._deployer.setV2.deployGovernanceModule(this.controller.address)];
                    case 8:
                        _g.governanceModule = _k.sent();
                        return [4 /*yield*/, this.initializeStandardComponents()];
                    case 9:
                        _k.sent();
                        _h = this;
                        return [4 /*yield*/, this._deployer.setV2.deployGeneralIndexModule(this.controller.address, this.weth.address)];
                    case 10:
                        _h.generalIndexModule = _k.sent();
                        modules = [
                            this.issuanceModule.address,
                            this.streamingFeeModule.address,
                            this.debtIssuanceModule.address,
                            this.governanceModule.address,
                            this.generalIndexModule.address,
                        ];
                        return [4 /*yield*/, this.controller.initialize([this.factory.address], // Factories
                            modules, // Modules
                            [this.integrationRegistry.address], // Resources
                            [0])];
                    case 11:
                        _k.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetFixture.prototype.initializeStandardComponents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._deployer.setV2.deployWETH()];
                    case 1:
                        _a.weth = _e.sent();
                        _b = this;
                        return [4 /*yield*/, this._deployer.setV2.deployTokenMock(this._ownerAddress, common_1.ether(100000), 6)];
                    case 2:
                        _b.usdc = _e.sent();
                        _c = this;
                        return [4 /*yield*/, this._deployer.setV2.deployTokenMock(this._ownerAddress, common_1.ether(100000), 8)];
                    case 3:
                        _c.wbtc = _e.sent();
                        _d = this;
                        return [4 /*yield*/, this._deployer.setV2.deployTokenMock(this._ownerAddress, common_1.ether(1000000), 18)];
                    case 4:
                        _d.dai = _e.sent();
                        return [4 /*yield*/, this.weth.deposit({ value: common_1.ether(200000) })];
                    case 5:
                        _e.sent();
                        return [4 /*yield*/, this.weth.approve(this.issuanceModule.address, common_1.ether(10000))];
                    case 6:
                        _e.sent();
                        return [4 /*yield*/, this.usdc.approve(this.issuanceModule.address, common_1.ether(10000))];
                    case 7:
                        _e.sent();
                        return [4 /*yield*/, this.wbtc.approve(this.issuanceModule.address, common_1.ether(10000))];
                    case 8:
                        _e.sent();
                        return [4 /*yield*/, this.dai.approve(this.issuanceModule.address, common_1.ether(10000))];
                    case 9:
                        _e.sent();
                        return [4 /*yield*/, this.weth.approve(this.debtIssuanceModule.address, common_1.ether(10000))];
                    case 10:
                        _e.sent();
                        return [4 /*yield*/, this.usdc.approve(this.debtIssuanceModule.address, common_1.ether(10000))];
                    case 11:
                        _e.sent();
                        return [4 /*yield*/, this.wbtc.approve(this.debtIssuanceModule.address, common_1.ether(10000))];
                    case 12:
                        _e.sent();
                        return [4 /*yield*/, this.dai.approve(this.debtIssuanceModule.address, common_1.ether(10000))];
                    case 13:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SetFixture.prototype.createSetToken = function (components, units, modules, manager, name, symbol) {
        if (manager === void 0) { manager = this._ownerAddress; }
        if (name === void 0) { name = "SetToken"; }
        if (symbol === void 0) { symbol = "SET"; }
        return __awaiter(this, void 0, void 0, function () {
            var txHash, retrievedSetAddress;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.factory.create(components, units, modules, manager, name, symbol)];
                    case 1:
                        txHash = _a.sent();
                        return [4 /*yield*/, new common_1.ProtocolUtils(this._provider).getCreatedSetTokenAddress(txHash.hash)];
                    case 2:
                        retrievedSetAddress = _a.sent();
                        return [2 /*return*/, new SetToken__factory_1.SetToken__factory(this._ownerSigner).attach(retrievedSetAddress)];
                }
            });
        });
    };
    SetFixture.prototype.approveAndIssueSetToken = function (setToken, issueQuantity, to) {
        if (to === void 0) { to = this._ownerAddress; }
        return __awaiter(this, void 0, void 0, function () {
            var positions, i, component, componentInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, setToken.getPositions()];
                    case 1:
                        positions = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < positions.length)) return [3 /*break*/, 6];
                        component = positions[i].component;
                        return [4 /*yield*/, this._deployer.setV2.getTokenMock(component)];
                    case 3:
                        componentInstance = _a.sent();
                        return [4 /*yield*/, componentInstance.approve(this.issuanceModule.address, constants_1.MAX_UINT_256)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [4 /*yield*/, this.issuanceModule.issue(setToken.address, issueQuantity, to)];
                    case 7:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SetFixture;
}());
exports.SetFixture = SetFixture;
