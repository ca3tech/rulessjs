"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayOp = void 0;
const ArrayTestFunctionFactory_1 = require("./ArrayTestFunctionFactory");
const Operator_1 = require("./Operator");
class ArrayOp extends Operator_1.Operator {
    /**
     * Create a new ArrayOp object
     *
     * @param op  The operator
     * @param testOp  The TestOp object that will be
     *                used to test all values of an array
     * @param arrayFunFactory  An optional ArrayTestFunctionFactory to
     *                         use for resolving the op
     *
     * @returns  A new ArrayOp object
     */
    constructor(op, testOp, arrayFunFactory) {
        super();
        this.op = op;
        this.testOp = testOp;
        if (arrayFunFactory === undefined) {
            arrayFunFactory = new ArrayTestFunctionFactory_1.ArrayTestFunctionFactory();
        }
        this.tester = arrayFunFactory.getTestFunction(op);
    }
    /**
     * The operation definition as a string
     *
     * @returns  The description
     */
    get description() {
        return `${this.op}(${this.testOp.description})`;
    }
    /**
     * Evaluate whether the tests pass
     *
     * @param datum  The data object to test
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    test(datum) {
        const attr = this.testOp.attributeName;
        const rslts = datum[attr].map(v => {
            const doc = {};
            doc[attr] = v;
            return this.testOp.test(doc);
        });
        return this.tester(rslts);
    }
}
exports.ArrayOp = ArrayOp;
