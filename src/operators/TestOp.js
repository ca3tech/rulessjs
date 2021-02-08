"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestOp = void 0;
const TestFunctionFactory_1 = require("./TestFunctionFactory");
class TestOp {
    /**
     * Create a new TestOp object
     *
     * @param def  The operation definition
     * @param testFunFactory  An optional TestFunctionFactory object
     *
     * @returns  A new TestOp object
     */
    constructor(def, testFunFactory) {
        this.attr = def.attr;
        this.operator = def.op;
        this.expect = def.expect;
        if (testFunFactory === undefined) {
            testFunFactory = new TestFunctionFactory_1.TestFunctionFactory();
        }
        this.tester = testFunFactory.getTestFunction(def.op);
    }
    /**
     * The operation definition as a string
     *
     * @returns  The description
     */
    get description() {
        return `${this.attr} ${this.operator} ${this.expect}`;
    }
    /**
     * Evaluate whether data point matches expectation
     *
     * @param datum  The data object to test
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    test(datum) {
        return this.tester(datum, this.attr, this.expect);
    }
}
exports.TestOp = TestOp;
