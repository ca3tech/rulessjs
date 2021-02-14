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
const ArrayOp_1 = require("../src/operators/ArrayOp");
const NotImplementedException_1 = require("../src/exceptions/NotImplementedException");
const TestOp_1 = require("../src/operators/TestOp");
mocha.describe("ArrayOp", function () {
    mocha.describe("all", function () {
        mocha.it("all tests true give true", function () {
            const xval = "value";
            const obj = { key: [xval, xval, xval] };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            const rop = new ArrayOp_1.ArrayOp("all", top);
            assert.ok(rop.test(obj), "test value");
            assert.strictEqual(rop.description, `all(key = ${xval})`, "description value");
        });
        mocha.it("all tests not all true give false", function () {
            const xval = "value1";
            const obj = { key: [xval, "value2", xval] };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            const rop = new ArrayOp_1.ArrayOp("all", top);
            assert.ok(!rop.test(obj), "test value");
            assert.strictEqual(rop.description, `all(key = ${xval})`, "description value");
        });
    });
    mocha.describe("any", function () {
        mocha.it("any tests all true give true", function () {
            const xval = "value";
            const obj = { key: [xval, xval, xval] };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            const rop = new ArrayOp_1.ArrayOp("any", top);
            assert.ok(rop.test(obj), "test value");
            assert.strictEqual(rop.description, `any(key = ${xval})`, "description value");
        });
        mocha.it("any tests some true give true", function () {
            const xval = "value1";
            const obj = { key: [xval, "value2", xval] };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            const rop = new ArrayOp_1.ArrayOp("any", top);
            assert.ok(rop.test(obj), "test value");
            assert.strictEqual(rop.description, `any(key = ${xval})`, "description value");
        });
        mocha.it("any tests none true give false", function () {
            const xval = "value1";
            const dval = "value2";
            const obj = { key: [dval, dval, dval] };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            const rop = new ArrayOp_1.ArrayOp("any", top);
            assert.ok(!rop.test(obj), "test value");
            assert.strictEqual(rop.description, `any(key = ${xval})`, "description value");
        });
    });
    mocha.describe("undefined operator", function () {
        mocha.it("throws NotImplementedException", function () {
            const k1val = "value1";
            assert.throws(() => {
                new ArrayOp_1.ArrayOp("nosuch", new TestOp_1.TestOp({ attr: "k1", op: "=", expect: k1val }));
            }, new NotImplementedException_1.NotImplementedException("operator nosuch not known"));
        });
    });
});
