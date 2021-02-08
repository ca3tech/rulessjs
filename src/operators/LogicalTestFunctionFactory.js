"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalTestFunctionFactory = void 0;
const NotImplementedException_1 = require("../exceptions/NotImplementedException");
class LogicalTestFunctionFactory {
    constructor() {
        this.testFuns = {
            "and": and,
            "or": or
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
exports.LogicalTestFunctionFactory = LogicalTestFunctionFactory;
function and(results) {
    return results.every(rslt => rslt);
}
function or(results) {
    return results.some(rslt => rslt);
}
