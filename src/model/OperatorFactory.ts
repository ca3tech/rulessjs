import { NotImplementedException } from "../exceptions/NotImplementedException";
import { LogicalOp } from "../operators/LogicalOp";
import { LogicalTestFunctionFactory } from "../operators/LogicalTestFunctionFactory";
import { Operator } from "../operators/Operator";
import { TestFunctionFactory } from "../operators/TestFunctionFactory";
import { TestOp } from "../operators/TestOp";
import { IOperatorDescription, ITestOpDescription, ITestOpExpect } from "./ModelContracts";

export class OperatorFactory {
    constructor(private testFunFactory? : TestFunctionFactory, private logFunFactory? : LogicalTestFunctionFactory) {
        if(this.testFunFactory === undefined) {
            this.testFunFactory = new TestFunctionFactory();
        }
        if(this.logFunFactory === undefined) {
            this.logFunFactory = new LogicalTestFunctionFactory();
        }
    }

    public getop(description : IOperatorDescription) : Operator {
        const op = Object.keys(description)[0];
        if(this.testFunFactory.isValidOperator(op)) {
            return this.newTestOp(description as ITestOpDescription);
        } else if(this.logFunFactory.isValidOperator(op)) {
            const tods = description[op] as ITestOpDescription[];
            const ops : TestOp[] = tods.map((d : ITestOpDescription) => this.newTestOp(d));
            return new LogicalOp(op, ops, this.logFunFactory);
        } else {
            throw new NotImplementedException(`operator ${op} not known`);
        }
    }

    private newTestOp(desc : ITestOpDescription) : TestOp {
        const op = Object.keys(desc)[0];
        return new TestOp({op: op, attr: desc[op].attr, expect: desc[op].value}, this.testFunFactory);
    }
}