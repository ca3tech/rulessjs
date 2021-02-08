import * as mocha from "mocha";
import * as assert from "assert";
import { LogicalOp } from "../src/operators/LogicalOp";
import { NotImplementedException } from "../src/exceptions/NotImplementedException";
import { TestOp } from "../src/operators/TestOp";

mocha.describe("LogicalOp", function() {
    mocha.describe("and", function() {
        mocha.it("true 2 children", function() {
            const k1val = "value1";
            const k2val = "value2";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp({attr: "k1", op: "=", expect: k1val}),
                new TestOp({attr: "k2", op: "=", expect: k2val})
            ]
            const lop = new LogicalOp("and", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} and k2 = ${k2val}`);
        });
        mocha.it("false 2 children", function() {
            const k1val = "value1";
            const k2val = "value2";
            const k2xval = "value3";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp({attr: "k1", op: "=", expect: k1val}),
                new TestOp({attr: "k2", op: "=", expect: k2xval})
            ]
            const lop = new LogicalOp("and", tops);
            assert.ok(! lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} and k2 = ${k2xval}`);
        });
        mocha.it("true 3 children", function() {
            const k1val = "value1";
            const k2val = "value2";
            const k3val = 3;
            const obj = {
                k1: k1val,
                k2: k2val,
                k3: k3val
            };
            const tops = [
                new TestOp({attr: "k1", op: "=", expect: k1val}),
                new TestOp({attr: "k2", op: "=", expect: k2val}),
                new TestOp({attr: "k3", op: "=", expect: k3val})
            ]
            const lop = new LogicalOp("and", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} and k2 = ${k2val} and k3 = ${k3val}`);
        });
    });
    mocha.describe("or", function() {
        mocha.it("true 2 children", function() {
            const k1val = "value1";
            const k2val = "value2";
            const k2xval = "value3";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp({attr: "k1", op: "=", expect: k1val}),
                new TestOp({attr: "k2", op: "=", expect: k2xval})
            ]
            const lop = new LogicalOp("or", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} or k2 = ${k2xval}`);
        });
        mocha.it("false 2 children", function() {
            const k1val = "value1";
            const k1xval = "value2";
            const k2val = "value3";
            const k2xval = "value4";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp({attr: "k1", op: "=", expect: k1xval}),
                new TestOp({attr: "k2", op: "=", expect: k2xval})
            ]
            const lop = new LogicalOp("or", tops);
            assert.ok(! lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1xval} or k2 = ${k2xval}`);
        });
        mocha.it("true 3 children", function() {
            const k1val = "value1";
            const k2val = "value2";
            const k3val = 3;
            const k3xval = 4;
            const obj = {
                k1: k1val,
                k2: k2val,
                k3: k3val
            };
            const tops = [
                new TestOp({attr: "k1", op: "=", expect: k1val}),
                new TestOp({attr: "k2", op: "=", expect: k2val}),
                new TestOp({attr: "k3", op: "=", expect: k3xval})
            ]
            const lop = new LogicalOp("or", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} or k2 = ${k2val} or k3 = ${k3xval}`);
        });
    });
    mocha.describe("undefined operator", function() {
        mocha.it("throws NotImplementedException", function() {
            const k1val = "value1";
            assert.throws(
                () => {
                    new LogicalOp("nosuch", [new TestOp({attr: "k1", op: "=", expect: k1val})])
                },
                new NotImplementedException("operator nosuch not known"));
        });
    });
});