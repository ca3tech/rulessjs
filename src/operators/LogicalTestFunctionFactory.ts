import { FunctionFactory } from "./FunctionFactory";

export class LogicalTestFunctionFactory extends FunctionFactory {
    constructor() {
        super({
            "and": and,
            "or": or
        });
    }
}

function and(results : boolean[]) : boolean {
    return results.every(rslt => rslt);
}

function or(results : boolean[]) : boolean {
    return results.some(rslt => rslt);
}
