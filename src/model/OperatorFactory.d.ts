import { LogicalTestFunctionFactory } from "../operators/LogicalTestFunctionFactory";
import { Operator } from "../operators/Operator";
import { TestFunctionFactory } from "../operators/TestFunctionFactory";
import { IOperatorDescription } from "./ModelContracts";
export declare class OperatorFactory {
    private testFunFactory?;
    private logFunFactory?;
    constructor(testFunFactory?: TestFunctionFactory, logFunFactory?: LogicalTestFunctionFactory);
    getop(description: IOperatorDescription): Operator;
    private newTestOp;
}
//# sourceMappingURL=OperatorFactory.d.ts.map