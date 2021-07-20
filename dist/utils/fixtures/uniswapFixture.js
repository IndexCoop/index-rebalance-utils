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
exports.UniswapFixture = void 0;
var deploys_1 = __importDefault(require("../deploys"));
var bignumber_1 = require("@ethersproject/bignumber");
var UniswapV2Pair__factory_1 = require("../../typechain/factories/UniswapV2Pair__factory");
var UniswapFixture = /** @class */ (function () {
    function UniswapFixture(provider, ownerAddress) {
        this._ownerSigner = provider.getSigner(ownerAddress);
        this._provider = provider;
        this._deployer = new deploys_1.default(this._ownerSigner);
    }
    UniswapFixture.prototype.initialize = function (_owner, _weth, _wbtc, _usdc, minimumInit) {
        if (minimumInit === void 0) { minimumInit = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, lastBlock, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        this.owner = _owner;
                        _a = this;
                        return [4 /*yield*/, this._deployer.external.deployUniswapV2Factory(this.owner.address)];
                    case 1:
                        _a.factory = _f.sent();
                        _b = this;
                        return [4 /*yield*/, this._deployer.external.deployUniswapV2Router02(this.factory.address, _weth)];
                    case 2:
                        _b.router = _f.sent();
                        _c = this;
                        return [4 /*yield*/, this._deployer.setV2.deployUniswapV2ExchangeAdapter(this.router.address)];
                    case 3:
                        _c.uniswapTradeAdapter = _f.sent();
                        // If we only want strict control over what pools are created, exit here.
                        if (minimumInit)
                            return [2 /*return*/];
                        return [4 /*yield*/, this._provider.getBlock("latest")];
                    case 4:
                        lastBlock = _f.sent();
                        _d = this;
                        return [4 /*yield*/, this._deployer.external.deployUni(this.owner.address, this.owner.address, bignumber_1.BigNumber.from(lastBlock.timestamp).add(2))];
                    case 5:
                        _d.uni = _f.sent();
                        _e = this;
                        return [4 /*yield*/, this.createNewPair(_weth, this.uni.address)];
                    case 6:
                        _e.uniWethPool = _f.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UniswapFixture.prototype.createNewPair = function (_tokenOne, _tokenTwo) {
        return __awaiter(this, void 0, void 0, function () {
            var poolAddress, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.factory.createPair(_tokenOne, _tokenTwo)];
                    case 1:
                        _c.sent();
                        _b = (_a = this.factory).allPairs;
                        return [4 /*yield*/, this.factory.allPairsLength()];
                    case 2: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).sub(1)])];
                    case 3:
                        poolAddress = _c.sent();
                        return [4 /*yield*/, new UniswapV2Pair__factory_1.UniswapV2Pair__factory(this._ownerSigner).attach(poolAddress)];
                    case 4: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    UniswapFixture.prototype.getTokenOrder = function (_tokenOne, _tokenTwo) {
        return _tokenOne.toLowerCase() < _tokenTwo.toLowerCase() ? [_tokenOne, _tokenTwo] : [_tokenTwo, _tokenOne];
    };
    return UniswapFixture;
}());
exports.UniswapFixture = UniswapFixture;
