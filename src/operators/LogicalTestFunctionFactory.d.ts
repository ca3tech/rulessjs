import { ILogicalTestFunction } from "./TestContracts";
export declare class LogicalTestFunctionFactory {
    private testFuns;
    constructor();
    /**
     * Determine whether a given operator is valid
     *
     * @param operator  The operator to test for validity
     * @returns  True if operator is valid else false
     */
    isValidOperator(operator: string): boolean;
    /**
     * Extend the set of known operators
     *
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    addOperator(operator: string, fun: ILogicalTestFunction): void;
    /**
     * Get the test function for the given operator
     *
     * @param operator  The operator
     *
     * @returns  The test function for the operator
     */
    getTestFunction(operator: string): ILogicalTestFunction;
}
//# sourceMappingURL=LogicalTestFunctionFactory.d.ts.map