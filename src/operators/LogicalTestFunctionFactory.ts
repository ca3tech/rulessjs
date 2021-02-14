import { FunctionFactory } from "./FunctionFactory";
import { ILogicalTestFunction } from "./TestContracts";

export class LogicalTestFunctionFactory extends FunctionFactory {
    constructor() {
        super({
            "and": and,
            "or": or
        });
    }

    public getTestFunction(operator : string) : ILogicalTestFunction {
        return super.getTestFunction(operator) as ILogicalTestFunction;
    }
}

function and(results : boolean[]) : boolean {
    return results.every(rslt => rslt);
}

function or(results : boolean[]) : boolean {
    return results.some(rslt => rslt);
}
