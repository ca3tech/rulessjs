import { ArrayTestFunctionFactory } from "./ArrayTestFunctionFactory";
import { Operator } from "./Operator";
import { IArrayTestFunction, ITestDatum } from "./TestContracts";
import { TestOp } from "./TestOp";

export class ArrayOp extends Operator {
    private op : string;
    private testOp : TestOp;
    private tester : IArrayTestFunction;

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
    constructor(op : string, testOp : TestOp, arrayFunFactory? : ArrayTestFunctionFactory) {
        super();
        this.op = op;
        this.testOp = testOp;
        if(arrayFunFactory === undefined) {
            arrayFunFactory = new ArrayTestFunctionFactory();
        }
        this.tester = arrayFunFactory.getTestFunction(op);
    }

    /**
     * The operation definition as a string
     * 
     * @returns  The description
     */
    public get description() : string {
        return `${this.op}(${this.testOp.description})`;
    }

    /**
     * Evaluate whether the tests pass
     * 
     * @param datum  The data object to test
     * 
     * @returns  True if the datapoint matches expectation and false if not
     */
    public test(datum : ITestDatum) : boolean {
        const attr = this.testOp.attributeName;
        const attrval : any = datum[attr];
        const rslts = attrval.map((v : string | number | Date) => {
            const doc : any = {};
            doc[attr] = v;
            return this.testOp.test(doc);
        });
        return this.tester(rslts);
    }
}