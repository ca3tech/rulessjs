"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFunctionFactory = void 0;
const FunctionFactory_1 = require("./FunctionFactory");
class TestFunctionFactory extends FunctionFactory_1.FunctionFactory {
    constructor() {
        super({
            "=": equal,
            "!=": notequal,
            ">": greater,
            ">=": greaterOrEqual,
            "<": lesser,
            "<=": lesserOrEqual
        });
    }
}
exports.TestFunctionFactory = TestFunctionFactory;
function equal(obj, attr, expect) {
    if (expect instanceof Date) {
        return obj[attr].getTime() == expect.getTime();
    }
    return obj[attr] == expect;
}
function notequal(obj, attr, expect) {
    return !equal(obj, attr, expect);
}
function greater(obj, attr, expect) {
    if (expect instanceof Date) {
        return obj[attr].getTime() > expect.getTime();
    }
    return obj[attr] > expect;
}
function greaterOrEqual(obj, attr, expect) {
    return greater(obj, attr, expect) || equal(obj, attr, expect);
}
function lesser(obj, attr, expect) {
    return !(greater(obj, attr, expect) || equal(obj, attr, expect));
}
function lesserOrEqual(obj, attr, expect) {
    return lesser(obj, attr, expect) || equal(obj, attr, expect);
}
