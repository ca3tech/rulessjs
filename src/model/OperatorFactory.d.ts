import { ArrayTestFunctionFactory } from "../operators/ArrayTestFunctionFactory";
import { LogicalTestFunctionFactory } from "../operators/LogicalTestFunctionFactory";
import { Operator } from "../operators/Operator";
import { TestFunctionFactory } from "../operators/TestFunctionFactory";
import { IOperatorDescription } from "./ModelContracts";
export declare class OperatorFactory {
    private testFunFactory?;
    private logFunFactory?;
    private arrayFunFactory?;
    constructor(testFunFactory?: TestFunctionFactory, logFunFactory?: LogicalTestFunctionFactory, arrayFunFactory?: ArrayTestFunctionFactory);
    getop(description: IOperatorDescription): Operator;
    private newTestOp;
}
//# sourceMappingURL=OperatorFactory.d.ts.map