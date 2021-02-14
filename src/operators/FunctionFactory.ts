import {NotImplementedException} from "../exceptions/NotImplementedException";
import {ITestFunction} from "./TestContracts";

export interface ITestFunctionMap {
    [op : string] : ITestFunction
}

export class FunctionFactory {
    constructor(private fxnmap : ITestFunctionMap) {}

    /**
     * Determine whether a given operator is valid
     * 
     * @param operator  The operator to test for validity
     * @returns  True if operator is valid else false
     */
    public isValidOperator(operator : string) : boolean {
        return Object.keys(this.fxnmap).includes(operator);
    }

    /**
     * Extend the set of known operators
     * 
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    public addOperator(operator : string, fun : ITestFunction) {
        this.fxnmap[operator] = fun;
    }

    /**
     * Get the test function for the given operator
     * 
     * @param operator  The operator
     * 
     * @returns  The test function for the operator
     */
    public getTestFunction(operator : string) : ITestFunction {
        if(this.fxnmap[operator] !== undefined) {
            return this.fxnmap[operator];
        }
        throw new NotImplementedException(`operator ${operator} not known`);
    }
}
