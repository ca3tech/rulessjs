"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayTestFunctionFactory = void 0;
const FunctionFactory_1 = require("./FunctionFactory");
class ArrayTestFunctionFactory extends FunctionFactory_1.FunctionFactory {
    constructor() {
        super({
            "all": all,
            "any": any
        });
    }
    getTestFunction(operator) {
        return super.getTestFunction(operator);
    }
}
exports.ArrayTestFunctionFactory = ArrayTestFunctionFactory;
function all(results) {
    return results.every(b => b);
}
function any(results) {
    return results.some(b => b);
}
