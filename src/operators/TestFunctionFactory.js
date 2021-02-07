"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestFunctionFactory = void 0;
const NotImplementedException_1 = require("../exceptions/NotImplementedException");
class TestFunctionFactory {
    constructor() {
        this.testFuns = {
            "=": equal,
            "!=": notequal,
            ">": greater,
            ">=": greaterOrEqual,
            "<": lesser,
            "<=": lesserOrEqual
        };
    }
    /**
     * Extend the set of known operators
     *
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    addOperator(operator, fun) {
        this.testFuns[operator] = fun;
    }
    /**
     * Get the test function for the given operator
     *
     * @param operator  The operator
     *
     * @returns  The test function for the operator
     */
    getTestFunction(operator) {
        if (this.testFuns[operator] !== undefined) {
            return this.testFuns[operator];
        }
        throw new NotImplementedException_1.NotImplementedException(`operator ${operator} not known`);
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
