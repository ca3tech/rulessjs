import { TestFunctionFactory } from "./TestFunctionFactory";
import { ITestOpDef } from "./TestContracts";
import { Operator } from "./Operator";
export declare class TestOp extends Operator {
    private attr;
    private operator;
    private expect;
    private tester;
    /**
     * Create a new TestOp object
     *
     * @param def  The operation definition
     * @param testFunFactory  An optional TestFunctionFactory object
     *
     * @returns  A new TestOp object
     */
    constructor(def: ITestOpDef, testFunFactory?: TestFunctionFactory);
    /**
     * Get the name of the attribute under test
     *
     * @returns  The name of the attribute
     */
    get attributeName(): string;
    /**
     * The operation definition as a string
     *
     * @returns  The description
     */
    get description(): string;
    /**
     * Evaluate whether data point matches expectation
     *
     * @param datum  The data object to test
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    test(datum: any): boolean;
}
//# sourceMappingURL=TestOp.d.ts.map