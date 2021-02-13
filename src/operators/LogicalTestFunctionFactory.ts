import {NotImplementedException} from "../exceptions/NotImplementedException";
import {ILogicalTestFunction, TestValue} from "./TestContracts";

export class LogicalTestFunctionFactory {
    private testFuns : any;

    constructor() {
        this.testFuns = {
            "and": and,
            "or": or
        }
    }

    /**
     * Determine whether a given operator is valid
     * 
     * @param operator  The operator to test for validity
     * @returns  True if operator is valid else false
     */
    public isValidOperator(operator : string) : boolean {
        return Object.keys(this.testFuns).includes(operator);
    }

    /**
     * Extend the set of known operators
     * 
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    public addOperator(operator : string, fun : ILogicalTestFunction) {
        this.testFuns[operator] = fun;
    }

    /**
     * Get the test function for the given operator
     * 
     * @param operator  The operator
     * 
     * @returns  The test function for the operator
     */
    public getTestFunction(operator : string) : ILogicalTestFunction {
        if(this.testFuns[operator] !== undefined) {
            return this.testFuns[operator];
        }
        throw new NotImplementedException(`operator ${operator} not known`);
    }
}

function and(results : boolean[]) : boolean {
    return results.every(rslt => rslt);
}

function or(results : boolean[]) : boolean {
    return results.some(rslt => rslt);
}
