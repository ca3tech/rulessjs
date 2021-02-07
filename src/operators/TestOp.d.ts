import { TestFunctionFactory } from "./TestFunctionFactory";
import { ITestOpDef, TestValue } from "./TestContracts";
export declare class TestOp {
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
     * The operation definition as a string
     *
     * @returns  The description
     */
    get description(): string;
    /**
     * Evaluate whether data point matches expectation
     *
     * @param datum  The data object to test
     * @param value  The value to evaluate
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    test(datum: any, value: TestValue): boolean;
}
//# sourceMappingURL=TestOp.d.ts.map