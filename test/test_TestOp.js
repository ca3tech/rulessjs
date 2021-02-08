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
const TestOp_1 = require("../src/operators/TestOp");
const NotImplementedException_1 = require("../src/exceptions/NotImplementedException");
mocha.describe("TestOp", function () {
    mocha.describe("equal", function () {
        mocha.it("strings", function () {
            const xval = "value";
            const obj = { key: xval };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key = ${xval}`, "description value");
        });
        mocha.it("numbers", function () {
            const xval = 1;
            const obj = { key: xval };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key = ${xval}`, "description value");
        });
        mocha.it("dates", function () {
            const xval = new Date("2020-01-20");
            const obj = { key: xval };
            const top = new TestOp_1.TestOp({ attr: "key", op: "=", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key = ${xval}`, "description value");
        });
    });
    mocha.describe("not equal", function () {
        mocha.it("strings", function () {
            const xval = "value";
            const obj = { key: "other value" };
            const top = new TestOp_1.TestOp({ attr: "key", op: "!=", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key != ${xval}`, "description value");
        });
        mocha.it("numbers", function () {
            const xval = 1;
            const obj = { key: 2 };
            const top = new TestOp_1.TestOp({ attr: "key", op: "!=", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key != ${xval}`, "description value");
        });
        mocha.it("dates", function () {
            const xval = new Date("2020-01-20T12:00:00Z");
            const obj = { key: new Date("2020-01-20T12:00:01Z") };
            const top = new TestOp_1.TestOp({ attr: "key", op: "!=", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key != ${xval}`, "description value");
        });
    });
    mocha.describe("greater", function () {
        mocha.it("strings", function () {
            const xval = "value1";
            const obj = { key: "value2" };
            const top = new TestOp_1.TestOp({ attr: "key", op: ">", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key > ${xval}`, "description value");
        });
        mocha.it("numbers", function () {
            const xval = 1;
            const obj = { key: 2 };
            const top = new TestOp_1.TestOp({ attr: "key", op: ">", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key > ${xval}`, "description value");
        });
        mocha.it("dates", function () {
            const xval = new Date("2020-01-20T12:00:00Z");
            const obj = { key: new Date("2020-01-20T12:00:01Z") };
            const top = new TestOp_1.TestOp({ attr: "key", op: ">", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key > ${xval}`, "description value");
        });
    });
    mocha.describe("greater or equal", function () {
        mocha.it("strings", function () {
            const xval = "value1";
            const eobj = { key: xval };
            const gobj = { key: "value2" };
            const top = new TestOp_1.TestOp({ attr: "key", op: ">=", expect: xval });
            assert.ok(top.test(eobj), "equal test value");
            assert.ok(top.test(gobj), "greater test value");
            assert.strictEqual(top.description, `key >= ${xval}`, "description value");
        });
        mocha.it("numbers", function () {
            const xval = 1;
            const eobj = { key: xval };
            const gobj = { key: 2 };
            const top = new TestOp_1.TestOp({ attr: "key", op: ">=", expect: xval });
            assert.ok(top.test(eobj), "equal test value");
            assert.ok(top.test(gobj), "greater test value");
            assert.strictEqual(top.description, `key >= ${xval}`, "description value");
        });
        mocha.it("dates", function () {
            const xval = new Date("2020-01-20T12:00:00Z");
            const eobj = { key: xval };
            const gobj = { key: new Date("2020-01-20T12:00:01Z") };
            const top = new TestOp_1.TestOp({ attr: "key", op: ">=", expect: xval });
            assert.ok(top.test(eobj), "equal test value");
            assert.ok(top.test(gobj), "greater test value");
            assert.strictEqual(top.description, `key >= ${xval}`, "description value");
        });
    });
    mocha.describe("lesser", function () {
        mocha.it("strings", function () {
            const xval = "value2";
            const obj = { key: "value1" };
            const top = new TestOp_1.TestOp({ attr: "key", op: "<", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key < ${xval}`, "description value");
        });
        mocha.it("numbers", function () {
            const xval = 2;
            const obj = { key: 1 };
            const top = new TestOp_1.TestOp({ attr: "key", op: "<", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key < ${xval}`, "description value");
        });
        mocha.it("dates", function () {
            const xval = new Date("2020-01-20T12:00:01Z");
            const obj = { key: new Date("2020-01-20T12:00:00Z") };
            const top = new TestOp_1.TestOp({ attr: "key", op: "<", expect: xval });
            assert.ok(top.test(obj), "test value");
            assert.strictEqual(top.description, `key < ${xval}`, "description value");
        });
    });
    mocha.describe("lesser or equal", function () {
        mocha.it("strings", function () {
            const xval = "value2";
            const eobj = { key: xval };
            const gobj = { key: "value1" };
            const top = new TestOp_1.TestOp({ attr: "key", op: "<=", expect: xval });
            assert.ok(top.test(eobj), "equal test value");
            assert.ok(top.test(gobj), "lesser test value");
            assert.strictEqual(top.description, `key <= ${xval}`, "description value");
        });
        mocha.it("numbers", function () {
            const xval = 2;
            const eobj = { key: xval };
            const gobj = { key: 1 };
            const top = new TestOp_1.TestOp({ attr: "key", op: "<=", expect: xval });
            assert.ok(top.test(eobj), "equal test value");
            assert.ok(top.test(gobj), "lesser test value");
            assert.strictEqual(top.description, `key <= ${xval}`, "description value");
        });
        mocha.it("dates", function () {
            const xval = new Date("2020-01-20T12:00:01Z");
            const eobj = { key: xval };
            const gobj = { key: new Date("2020-01-20T12:00:00Z") };
            const top = new TestOp_1.TestOp({ attr: "key", op: "<=", expect: xval });
            assert.ok(top.test(eobj), "equal test value");
            assert.ok(top.test(gobj), "lesser test value");
            assert.strictEqual(top.description, `key <= ${xval}`, "description value");
        });
    });
    mocha.describe("undefined operator", function () {
        mocha.it("throws NotImplementedException", function () {
            assert.throws(() => {
                new TestOp_1.TestOp({ attr: "key", op: "nosuch", expect: null });
            }, new NotImplementedException_1.NotImplementedException("operator nosuch not known"));
        });
    });
});
