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
exports.getWallets = exports.getEthBalance = exports.getRandomAddress = exports.getRandomAccount = exports.getAccounts = void 0;
var hardhat_1 = require("hardhat");
var provider = hardhat_1.ethers.provider;
exports.getAccounts = function () { return __awaiter(void 0, void 0, void 0, function () {
    var accounts, wallets, i, _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                accounts = [];
                return [4 /*yield*/, exports.getWallets()];
            case 1:
                wallets = _d.sent();
                i = 0;
                _d.label = 2;
            case 2:
                if (!(i < wallets.length)) return [3 /*break*/, 5];
                _b = (_a = accounts).push;
                _c = {
                    wallet: wallets[i]
                };
                return [4 /*yield*/, wallets[i].getAddress()];
            case 3:
                _b.apply(_a, [(_c.address = _d.sent(),
                        _c)]);
                _d.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/, accounts];
        }
    });
}); };
// Use the last wallet to ensure it has Ether
exports.getRandomAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
    var accounts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, exports.getAccounts()];
            case 1:
                accounts = _a.sent();
                return [2 /*return*/, accounts[accounts.length - 1]];
        }
    });
}); };
exports.getRandomAddress = function () { return __awaiter(void 0, void 0, void 0, function () {
    var wallet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                wallet = hardhat_1.ethers.Wallet.createRandom().connect(provider);
                return [4 /*yield*/, wallet.getAddress()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getEthBalance = function (account) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, provider.getBalance(account)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
// NOTE ethers.signers may be a buidler specific function
exports.getWallets = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, hardhat_1.ethers.getSigners()];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
