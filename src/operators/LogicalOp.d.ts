import { LogicalTestFunctionFactory } from "./LogicalTestFunctionFactory";
import { Operator } from "./Operator";
import { TestOp } from "./TestOp";
export declare class LogicalOp extends Operator {
    private op;
    private testOps;
    private tester;
    /**
     * Create a new LogicalOp object
     *
     * @param op  The operator
     * @param testOps  The TestOp objects whose results will have op applied
     *
     * @returns  A new LogicalOp object
     */
    constructor(op: string, testOps: TestOp[], testFunFactory?: LogicalTestFunctionFactory);
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
//# sourceMappingURL=LogicalOp.d.ts.map