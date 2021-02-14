import { LogicalTestFunctionFactory } from "./LogicalTestFunctionFactory";
import { Operator } from "./Operator";
import { ILogicalTestFunction, ITestDatum } from "./TestContracts";
import { TestOp } from "./TestOp";

export class LogicalOp extends Operator {
    private op : string;
    private testOps : TestOp[];
    private tester : ILogicalTestFunction;

    /**
     * Create a new LogicalOp object
     * 
     * @param op  The operator
     * @param testOps  The TestOp objects whose results will have op applied
     * 
     * @returns  A new LogicalOp object
     */
    constructor(op : string, testOps : TestOp[], testFunFactory? : LogicalTestFunctionFactory) {
        super();
        this.op = op;
        this.testOps = testOps;
        if(testFunFactory === undefined) {
            testFunFactory = new LogicalTestFunctionFactory();
        }
        this.tester = testFunFactory.getTestFunction(op);
    }

    /**
     * The operation definition as a string
     * 
     * @returns  The description
     */
    public get description() : string {
        return this.testOps.map(op => op.description).join(` ${this.op} `);
    }

    /**
     * Evaluate whether the tests pass
     * 
     * @param datum  The data object to test
     * 
     * @returns  True if the datapoint matches expectation and false if not
     */
    public test(datum : ITestDatum) : boolean {
        return this.tester(this.testOps.map(op => op.test(datum)));
    }
}