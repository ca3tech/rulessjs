"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogicalTestFunctionFactory = void 0;
const FunctionFactory_1 = require("./FunctionFactory");
class LogicalTestFunctionFactory extends FunctionFactory_1.FunctionFactory {
    constructor() {
        super({
            "and": and,
            "or": or
        });
    }
}
exports.LogicalTestFunctionFactory = LogicalTestFunctionFactory;
function and(results) {
    return results.every(rslt => rslt);
}
function or(results) {
    return results.some(rslt => rslt);
}
