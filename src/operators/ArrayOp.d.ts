import { ArrayTestFunctionFactory } from "./ArrayTestFunctionFactory";
import { Operator } from "./Operator";
import { TestOp } from "./TestOp";
export declare class ArrayOp extends Operator {
    private op;
    private testOp;
    private tester;
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
    constructor(op: string, testOp: TestOp, arrayFunFactory?: ArrayTestFunctionFactory);
    /**
     * The operation definition as a string
     *
     * @returns  The description
     */
    get description(): string;
    /**
     * Evaluate whether the tests pass
     *
     * @param datum  The data object to test
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    test(datum: any): boolean;
}
//# sourceMappingURL=ArrayOp.d.ts.map