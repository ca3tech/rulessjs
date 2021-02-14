"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatorFactory = void 0;
const NotImplementedException_1 = require("../exceptions/NotImplementedException");
const ArrayOp_1 = require("../operators/ArrayOp");
const ArrayTestFunctionFactory_1 = require("../operators/ArrayTestFunctionFactory");
const LogicalOp_1 = require("../operators/LogicalOp");
const LogicalTestFunctionFactory_1 = require("../operators/LogicalTestFunctionFactory");
const TestFunctionFactory_1 = require("../operators/TestFunctionFactory");
const TestOp_1 = require("../operators/TestOp");
class OperatorFactory {
    constructor(testFunFactory, logFunFactory, arrayFunFactory) {
        this.testFunFactory = testFunFactory;
        this.logFunFactory = logFunFactory;
        this.arrayFunFactory = arrayFunFactory;
        if (this.testFunFactory === undefined) {
            this.testFunFactory = new TestFunctionFactory_1.TestFunctionFactory();
        }
        if (this.logFunFactory === undefined) {
            this.logFunFactory = new LogicalTestFunctionFactory_1.LogicalTestFunctionFactory();
        }
        if (this.arrayFunFactory === undefined) {
            this.arrayFunFactory = new ArrayTestFunctionFactory_1.ArrayTestFunctionFactory();
        }
    }
    getop(description) {
        const op = Object.keys(description)[0];
        if (this.testFunFactory.isValidOperator(op)) {
            return this.newTestOp(description);
        }
        else if (this.logFunFactory.isValidOperator(op)) {
            const tods = description[op];
            const ops = tods.map((d) => this.newTestOp(d));
            return new LogicalOp_1.LogicalOp(op, ops, this.logFunFactory);
        }
        else if (this.arrayFunFactory.isValidOperator(op)) {
            const d = description[op];
            const top = this.newTestOp(d);
            return new ArrayOp_1.ArrayOp(op, top, this.arrayFunFactory);
        }
        else {
            throw new NotImplementedException_1.NotImplementedException(`operator ${op} not known`);
        }
    }
    newTestOp(desc) {
        const op = Object.keys(desc)[0];
        return new TestOp_1.TestOp({ op: op, attr: desc[op].attr, expect: desc[op].value }, this.testFunFactory);
    }
}
exports.OperatorFactory = OperatorFactory;
