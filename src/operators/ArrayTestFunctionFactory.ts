import { FunctionFactory } from "./FunctionFactory";

export class ArrayTestFunctionFactory extends FunctionFactory {
    constructor() {
        super({
            "all": all,
            "any": any
        });
    }
}

function all(results : boolean[]) : boolean {
    return results.every(b => b);
}

function any(results : boolean[]) : boolean {
    return results.some(b => b);
}