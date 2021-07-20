"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertLibraryNameToLinkId = void 0;
var ethers_1 = require("ethers");
var path_1 = __importDefault(require("path"));
// Converts a fully qualified contract name in a bytecode link id.
// (A fully qualified name looks like: `contracts/mocks/LibraryMock.sol:LibraryMock`)
function convertLibraryNameToLinkId(libraryName) {
    if (!(libraryName.includes(path_1.default.sep) && libraryName.includes(":"))) {
        throw new Error("Converting library name to link id requires a fully qualified " +
            "contract name. Example: `contracts/mocks/LibraryMock.sol:LibraryMock`");
    }
    var hashedName = ethers_1.utils.keccak256(ethers_1.utils.toUtf8Bytes(libraryName));
    return "__$" + hashedName.slice(2).slice(0, 34) + "$__";
}
exports.convertLibraryNameToLinkId = convertLibraryNameToLinkId;
