"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var deploySetV2_1 = __importDefault(require("./deploySetV2"));
var deployExternal_1 = __importDefault(require("./deployExternal"));
var DeployHelper = /** @class */ (function () {
    function DeployHelper(deployerSigner) {
        this.setV2 = new deploySetV2_1.default(deployerSigner);
        this.external = new deployExternal_1.default(deployerSigner);
    }
    return DeployHelper;
}());
exports.default = DeployHelper;
