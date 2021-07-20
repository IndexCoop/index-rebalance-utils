"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqrt = exports.min = exports.divDown = exports.preciseDivCeilInt = exports.preciseDivCeil = exports.preciseDiv = exports.preciseMulCeilInt = exports.preciseMulCeil = exports.preciseMul = void 0;
var constants_1 = require("../constants");
exports.preciseMul = function (a, b) {
    return a.mul(b).div(constants_1.PRECISE_UNIT);
};
exports.preciseMulCeil = function (a, b) {
    if (a.eq(0) || b.eq(0)) {
        return constants_1.ZERO;
    }
    return a.mul(b).sub(1).div(constants_1.PRECISE_UNIT).add(1);
};
exports.preciseMulCeilInt = function (a, b) {
    if (a.eq(0) || b.eq(0)) {
        return constants_1.ZERO;
    }
    if (a.gt(0) && b.gt(0) || a.lt(0) && b.lt(0)) {
        return a.mul(b).sub(1).div(constants_1.PRECISE_UNIT).add(1);
    }
    else {
        return a.mul(b).add(1).div(constants_1.PRECISE_UNIT).sub(1);
    }
};
exports.preciseDiv = function (a, b) {
    return a.mul(constants_1.PRECISE_UNIT).div(b);
};
exports.preciseDivCeil = function (a, b) {
    if (a.eq(0) || b.eq(0)) {
        return constants_1.ZERO;
    }
    return a.mul(constants_1.PRECISE_UNIT).sub(1).div(b).add(1);
};
exports.preciseDivCeilInt = function (a, b) {
    if (a.eq(0) || b.eq(0)) {
        return constants_1.ZERO;
    }
    if (a.gt(0) && b.gt(0) || a.lt(0) && b.lt(0)) {
        return a.mul(constants_1.PRECISE_UNIT).sub(1).div(b).add(1);
    }
    else {
        return a.mul(constants_1.PRECISE_UNIT).add(1).div(b).sub(1);
    }
};
exports.divDown = function (a, b) {
    var result = a.div(b);
    if (a.mul(b).lt(0) && !a.mod(b).isZero()) {
        result = result.sub(1);
    }
    return result;
};
exports.min = function (valueOne, valueTwo) {
    return valueOne.lt(valueTwo) ? valueOne : valueTwo;
};
function sqrt(value) {
    var z = value.add(constants_1.ONE).div(constants_1.TWO);
    var y = value;
    while (z.sub(y).isNegative()) {
        y = z;
        z = value.div(z).add(z).div(constants_1.TWO);
    }
    return y;
}
exports.sqrt = sqrt;
