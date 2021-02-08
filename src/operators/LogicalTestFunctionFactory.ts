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
