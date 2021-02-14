import { FunctionFactory } from "./FunctionFactory";
import { IArrayTestFunction } from "./TestContracts";

export class ArrayTestFunctionFactory extends FunctionFactory {
    constructor() {
        super({
            "all": all,
            "any": any
        });
    }

    public getTestFunction(operator : string) : IArrayTestFunction {
        return super.getTestFunction(operator) as IArrayTestFunction;
    }
}

function all(results : boolean[]) : boolean {
    return results.every(b => b);
}

function any(results : boolean[]) : boolean {
    return results.some(b => b);
}