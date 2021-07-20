"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bigNumberToData = void 0;
exports.bigNumberToData = function (number) { return number.toHexString().replace("0x", "").padStart(64, "0"); };
