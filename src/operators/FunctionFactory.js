"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionFactory = void 0;
const NotImplementedException_1 = require("../exceptions/NotImplementedException");
class FunctionFactory {
    constructor(fxnmap) {
        this.fxnmap = fxnmap;
    }
    /**
     * Determine whether a given operator is valid
     *
     * @param operator  The operator to test for validity
     * @returns  True if operator is valid else false
     */
    isValidOperator(operator) {
        return Object.keys(this.fxnmap).includes(operator);
    }
    /**
     * Extend the set of known operators
     *
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    addOperator(operator, fun) {
        this.fxnmap[operator] = fun;
    }
    /**
     * Get the test function for the given operator
     *
     * @param operator  The operator
     *
     * @returns  The test function for the operator
     */
    getTestFunction(operator) {
        if (this.fxnmap[operator] !== undefined) {
            return this.fxnmap[operator];
        }
        throw new NotImplementedException_1.NotImplementedException(`operator ${operator} not known`);
    }
}
exports.FunctionFactory = FunctionFactory;
