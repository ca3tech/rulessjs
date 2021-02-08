"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha = __importStar(require("mocha"));
const assert = __importStar(require("assert"));
const LogicalOp_1 = require("../src/operators/LogicalOp");
const NotImplementedException_1 = require("../src/exceptions/NotImplementedException");
const TestOp_1 = require("../src/operators/TestOp");
mocha.describe("LogicalOp", function () {
    mocha.describe("and", function () {
        mocha.it("true 2 children", function () {
            const k1val = "value1";
            const k2val = "value2";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val }),
                new TestOp_1.TestOp({ attr: "k2", op: "=", expect: k2val })
            ];
            const lop = new LogicalOp_1.LogicalOp("and", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} and k2 = ${k2val}`);
        });
        mocha.it("false 2 children", function () {
            const k1val = "value1";
            const k2val = "value2";
            const k2xval = "value3";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val }),
                new TestOp_1.TestOp({ attr: "k2", op: "=", expect: k2xval })
            ];
            const lop = new LogicalOp_1.LogicalOp("and", tops);
            assert.ok(!lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} and k2 = ${k2xval}`);
        });
        mocha.it("true 3 children", function () {
            const k1val = "value1";
            const k2val = "value2";
            const k3val = 3;
            const obj = {
                k1: k1val,
                k2: k2val,
                k3: k3val
            };
            const tops = [
                new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val }),
                new TestOp_1.TestOp({ attr: "k2", op: "=", expect: k2val }),
                new TestOp_1.TestOp({ attr: "k3", op: "=", expect: k3val })
            ];
            const lop = new LogicalOp_1.LogicalOp("and", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} and k2 = ${k2val} and k3 = ${k3val}`);
        });
    });
    mocha.describe("or", function () {
        mocha.it("true 2 children", function () {
            const k1val = "value1";
            const k2val = "value2";
            const k2xval = "value3";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val }),
                new TestOp_1.TestOp({ attr: "k2", op: "=", expect: k2xval })
            ];
            const lop = new LogicalOp_1.LogicalOp("or", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} or k2 = ${k2xval}`);
        });
        mocha.it("false 2 children", function () {
            const k1val = "value1";
            const k1xval = "value2";
            const k2val = "value3";
            const k2xval = "value4";
            const obj = {
                k1: k1val,
                k2: k2val
            };
            const tops = [
                new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1xval }),
                new TestOp_1.TestOp({ attr: "k2", op: "=", expect: k2xval })
            ];
            const lop = new LogicalOp_1.LogicalOp("or", tops);
            assert.ok(!lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1xval} or k2 = ${k2xval}`);
        });
        mocha.it("true 3 children", function () {
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
                new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val }),
                new TestOp_1.TestOp({ attr: "k2", op: "=", expect: k2val }),
                new TestOp_1.TestOp({ attr: "k3", op: "=", expect: k3xval })
            ];
            const lop = new LogicalOp_1.LogicalOp("or", tops);
            assert.ok(lop.test(obj), "test value");
            assert.strictEqual(lop.description, `k1 = ${k1val} or k2 = ${k2val} or k3 = ${k3xval}`);
        });
    });
    mocha.describe("undefined operator", function () {
        mocha.it("throws NotImplementedException", function () {
            const k1val = "value1";
            assert.throws(() => {
                new LogicalOp_1.LogicalOp("nosuch", [new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val })]);
            }, new NotImplementedException_1.NotImplementedException("operator nosuch not known"));
        });
    });
});
