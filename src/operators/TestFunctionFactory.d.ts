import { ITestFunction } from "./TestContracts";
export declare class TestFunctionFactory {
    private testFuns;
    constructor();
    /**
     * Extend the set of known operators
     *
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    addOperator(operator: string, fun: ITestFunction): void;
    /**
     * Get the test function for the given operator
     *
     * @param operator  The operator
     *
     * @returns  The test function for the operator
     */
    getTestFunction(operator: string): ITestFunction;
}
//# sourceMappingURL=TestFunctionFactory.d.ts.map