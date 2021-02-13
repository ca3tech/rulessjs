import * as mocha from "mocha";
import * as assert from "assert";
import { OperatorFactory } from "../src/model/OperatorFactory";
import { TestOp } from "../src/operators/TestOp";
import { LogicalOp } from "../src/operators/LogicalOp";
import { NotImplementedException } from "../src/exceptions/NotImplementedException";

mocha.describe("OperatorFactory", function() {
    mocha.it("TestOp", function() {
        const desc = {
            "=": {
                attr: "col1",
                value: 1
            }
        };
        const factory = new OperatorFactory();
        const op = factory.getop(desc);
        assert.ok(op instanceof TestOp, "operator type is TestOp");
        assert.strictEqual(op.description, "col1 = 1", "operator description value");
    });

    mocha.it("LogicalOp", function() {
        const desc = {
            "or": [
                {
                    "=": {
                        attr: "col1",
                        value: 1
                    }
                },
                {
                    "=": {
                        attr: "col2",
                        value: 2
                    }
                }
            ]
        };
        const factory = new OperatorFactory();
        const op = factory.getop(desc);
        assert.ok(op instanceof LogicalOp, "operator type is LogicalOp");
        assert.strictEqual(op.description, "col1 = 1 or col2 = 2", "operator description value");
    });

    mocha.it("undefined op", function() {
        const desc = {
            "notdefined": {
                attr: "col1",
                value: 1
            }
        };
        const factory = new OperatorFactory();
        assert.throws(
            () => {
                factory.getop(desc)
            },
            new NotImplementedException("operator notdefined not known"));
    });
});