import {TestFunctionFactory} from "./TestFunctionFactory";
import {ITestOpDef, ITestFunction, TestValue} from "./TestContracts";
import { Operator } from "./Operator";

export class TestOp extends Operator {
    private attr : string;
    private operator : string;
    private expect : any;
    private tester : ITestFunction;

    /**
     * Create a new TestOp object
     * 
     * @param def  The operation definition
     * @param testFunFactory  An optional TestFunctionFactory object
     * 
     * @returns  A new TestOp object
     */
    constructor(def : ITestOpDef, testFunFactory? : TestFunctionFactory) {
        super();
        this.attr = def.attr;
        this.operator = def.op;
        this.expect = def.expect;
        if(testFunFactory === undefined) {
            testFunFactory = new TestFunctionFactory();
        }
        this.tester = testFunFactory.getTestFunction(def.op);
    }

    /**
     * The operation definition as a string
     * 
     * @returns  The description
     */
    public get description() : string {
        return `${this.attr} ${this.operator} ${this.expect}`;
    }

    /**
     * Evaluate whether data point matches expectation
     * 
     * @param datum  The data object to test
     * 
     * @returns  True if the datapoint matches expectation and false if not
     */
    public test(datum : any) : boolean {
        return this.tester(datum, this.attr, this.expect);
    }
}