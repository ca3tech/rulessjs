"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalOp = void 0;
const LogicalTestFunctionFactory_1 = require("./LogicalTestFunctionFactory");
class LogicalOp {
    /**
     * Create a new LogicalOp object
     *
     * @param op  The operator
     * @param testOps  The TestOp objects whose results will have op applied
     *
     * @returns  A new LogicalOp object
     */
    constructor(op, testOps, testFunFactory) {
        this.op = op;
        this.testOps = testOps;
        if (testFunFactory === undefined) {
            testFunFactory = new LogicalTestFunctionFactory_1.LogicalTestFunctionFactory();
        }
        this.tester = testFunFactory.getTestFunction(op);
    }
    /**
     * The operation definition as a string
     *
     * @returns  The description
     */
    get description() {
        return this.testOps.map(op => op.description).join(` ${this.op} `);
    }
    /**
     * Evaluate whether the tests pass
     *
     * @param datum  The data object to test
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    test(datum) {
        return this.tester(this.testOps.map(op => op.test(datum)));
    }
}
exports.LogicalOp = LogicalOp;
