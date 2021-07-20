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
exports.UniswapV3Fixture = void 0;
var deploys_1 = __importDefault(require("../deploys"));
var constants_1 = require("../constants");
var ethers_1 = require("ethers");
var UniswapV3Pool__factory_1 = require("../../typechain/factories/UniswapV3Pool__factory");
var index_1 = require("../index");
var utils_1 = require("ethers/lib/utils");
var UniswapV3Fixture = /** @class */ (function () {
    /**
     * Instantiates a new UniswapV3Fixture
     *
     * @param provider      the ethers web3 provider to use
     * @param ownerAddress  the address of the owner
     */
    function UniswapV3Fixture(provider, ownerAddress) {
        this._ownerSigner = provider.getSigner(ownerAddress);
        this._deployer = new deploys_1.default(this._ownerSigner);
    }
    /**
     * Deploys contracts and creates weth-dai and weth-wbtc pools
     *
     * @param _owner  the owner of the deployed Uniswap V3 system
     * @param _weth   weth address
     * @param _wbtc   wbtc address
     * @param _dai    dai address
     */
    UniswapV3Fixture.prototype.initialize = function (_owner, _weth, _wethPrice, _wbtc, _wbtcPrice, _dai) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this._deployer.external.deployUniswapV3Factory()];
                    case 1:
                        _a.factory = _h.sent();
                        _b = this;
                        return [4 /*yield*/, this._deployer.external.deploySwapRouter(this.factory.address, _weth.address)];
                    case 2:
                        _b.swapRouter = _h.sent();
                        _c = this;
                        return [4 /*yield*/, this._deployer.external.deployNFTDescriptor()];
                    case 3:
                        _c.nftDescriptor = _h.sent();
                        _d = this;
                        return [4 /*yield*/, this._deployer.external.deployNftPositionManager(this.factory.address, _weth.address, this.nftDescriptor.address)];
                    case 4:
                        _d.nftPositionManager = _h.sent();
                        _e = this;
                        return [4 /*yield*/, this._deployer.external.deployQuoter(this.factory.address, _weth.address)];
                    case 5:
                        _e.quoter = _h.sent();
                        _f = this;
                        return [4 /*yield*/, this.createNewPair(_weth, _dai, 3000, _wethPrice)];
                    case 6:
                        _f.wethDaiPool = _h.sent();
                        _g = this;
                        return [4 /*yield*/, this.createNewPair(_weth, _wbtc, 3000, _wethPrice / _wbtcPrice)];
                    case 7:
                        _g.wethWbtcPool = _h.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates and initializes a new pool
     *
     * @param _token0         address of the first token
     * @param _token1         address of the second token
     * @param _fee            fee tier of either 500, 3000, or 10000
     * @param _ratio          the initial price ratio of the pool equal to priceToken0 / priceToken1
     * @returns               a new Uniswap V3 pool
     */
    UniswapV3Fixture.prototype.createNewPair = function (_token0, _token1, _fee, _ratio) {
        return __awaiter(this, void 0, void 0, function () {
            var ratio, _a, _b, _c, _d, _e, _f, token0Ordered, token1Ordered, sqrtPrice;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _a = _ratio;
                        _c = (_b = Math).pow;
                        _d = [10];
                        return [4 /*yield*/, _token1.decimals()];
                    case 1:
                        _e = (_g.sent());
                        return [4 /*yield*/, _token0.decimals()];
                    case 2:
                        ratio = _a * (_c.apply(_b, _d.concat([(_e - (_g.sent()))])));
                        if (_token0.address.toLowerCase() > _token1.address.toLowerCase()) {
                            ratio = 1 / ratio;
                        }
                        _f = this.getTokenOrder(_token0, _token1), token0Ordered = _f[0], token1Ordered = _f[1];
                        sqrtPrice = this._getSqrtPriceX96(ratio);
                        return [4 /*yield*/, this.nftPositionManager.createAndInitializePoolIfNecessary(token0Ordered.address, token1Ordered.address, _fee, sqrtPrice)];
                    case 3:
                        _g.sent();
                        return [2 /*return*/, this.getPool(_token0, _token1, _fee)];
                }
            });
        });
    };
    /**
     * Adds liquidity across the widest range, emulating a single Uniswap V2 LP
     *
     * @param _token0     address of token 1
     * @param _token1     address of token 2
     * @param _fee        the fee tier of either 500, 3000, or 10000
     * @param _amount0    maximum amount of token 1 used
     * @param _amount1    maximum amount of token 2 used
     * @param _recipient  the recipient of the LP NFT
     */
    UniswapV3Fixture.prototype.addLiquidityWide = function (_token0, _token1, _fee, _amount0, _amount1, _recipient) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, amount0Ordered, amount1Ordered, _b, token0Ordered, token1Ordered, tickSpacing, maxTick, maxValidTick, minValidTick;
            var _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _a = [_amount0, _amount1], amount0Ordered = _a[0], amount1Ordered = _a[1];
                        _b = [_token0, _token1], token0Ordered = _b[0], token1Ordered = _b[1];
                        if (_token0.address.toLowerCase() > _token1.address.toLowerCase()) {
                            _c = [_amount1, _amount0], amount0Ordered = _c[0], amount1Ordered = _c[1];
                            _d = [_token1, _token0], token0Ordered = _d[0], token1Ordered = _d[1];
                        }
                        tickSpacing = _fee / 50;
                        maxTick = 887272;
                        maxValidTick = Math.floor(maxTick / tickSpacing) * tickSpacing;
                        minValidTick = Math.ceil(-maxTick / tickSpacing) * tickSpacing;
                        return [4 /*yield*/, this.nftPositionManager.connect(this._ownerSigner).mint({
                                fee: _fee,
                                token0: token0Ordered.address,
                                token1: token1Ordered.address,
                                tickLower: minValidTick,
                                tickUpper: maxValidTick,
                                amount0Desired: amount0Ordered,
                                amount1Desired: amount1Ordered,
                                amount0Min: 0,
                                amount1Min: 0,
                                deadline: constants_1.MAX_UINT_256,
                                recipient: _recipient,
                            })];
                    case 1:
                        _e.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Fetches a UniswapV3Pool
     *
     * @param _token0   first token
     * @param _token1   second token
     * @param _fee      fee tier of either 500, 3000, or 10000
     * @returns         the UniswapV3Pool
     */
    UniswapV3Fixture.prototype.getPool = function (_token0, _token1, _fee) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, token0Ordered, token1Ordered, poolAddress;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.getTokenOrder(_token0, _token1), token0Ordered = _a[0], token1Ordered = _a[1];
                        return [4 /*yield*/, this.factory.getPool(token0Ordered.address, token1Ordered.address, _fee)];
                    case 1:
                        poolAddress = _b.sent();
                        return [2 /*return*/, UniswapV3Pool__factory_1.UniswapV3Pool__factory.connect(poolAddress, this._ownerSigner)];
                }
            });
        });
    };
    /**
     * Gets the proper order of the tokens since Uniswap requires that
     * tokens be passed to it in a particular order for many of its functions
     *
     * @param _token0   first token
     * @param _token1   second token
     * @returns         [ first, second ]
     */
    UniswapV3Fixture.prototype.getTokenOrder = function (_token0, _token1) {
        return _token0.address.toLowerCase() < _token1.address.toLowerCase() ? [_token0, _token1] : [_token1, _token0];
    };
    UniswapV3Fixture.prototype._getSqrtPriceX96 = function (_ratio) {
        return utils_1.parseEther(Math.sqrt(_ratio).toFixed(18).toString()).mul(ethers_1.BigNumber.from(2).pow(96)).div(index_1.ether(1));
    };
    return UniswapV3Fixture;
}());
exports.UniswapV3Fixture = UniswapV3Fixture;
