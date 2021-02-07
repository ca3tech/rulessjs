import * as mocha from "mocha";
import * as assert from "assert";
import { TestOp } from "../src/operators/TestOp";
import { NotImplementedException } from "../src/exceptions/NotImplementedException";

mocha.describe("TestOp", function() {
    mocha.describe("equal", function() {
        mocha.it("strings", function() {
            const xval = "value";
            const obj = {key: xval};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key = ${xval}`, "description value");
        });
        mocha.it("numbers", function() {
            const xval = 1;
            const obj = {key: xval};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key = ${xval}`, "description value");
        });
        mocha.it("dates", function() {
            const xval = new Date("2020-01-20");
            const obj = {key: xval};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key = ${xval}`, "description value");
        });
    });
    mocha.describe("not equal", function() {
        mocha.it("strings", function() {
            const xval = "value";
            const obj = {key: "other value"};
            const top = new TestOp({attr: "key", op: "!=", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key != ${xval}`, "description value");
        });
        mocha.it("numbers", function() {
            const xval = 1;
            const obj = {key: 2};
            const top = new TestOp({attr: "key", op: "!=", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key != ${xval}`, "description value");
        });
        mocha.it("dates", function() {
            const xval = new Date("2020-01-20T12:00:00Z");
            const obj = {key: new Date("2020-01-20T12:00:01Z")};
            const top = new TestOp({attr: "key", op: "!=", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key != ${xval}`, "description value");
        });
    });
    mocha.describe("greater", function() {
        mocha.it("strings", function() {
            const xval = "value1";
            const obj = {key: "value2"};
            const top = new TestOp({attr: "key", op: ">", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key > ${xval}`, "description value");
        });
        mocha.it("numbers", function() {
            const xval = 1;
            const obj = {key: 2};
            const top = new TestOp({attr: "key", op: ">", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key > ${xval}`, "description value");
        });
        mocha.it("dates", function() {
            const xval = new Date("2020-01-20T12:00:00Z");
            const obj = {key: new Date("2020-01-20T12:00:01Z")};
            const top = new TestOp({attr: "key", op: ">", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key > ${xval}`, "description value");
        });
    });
    mocha.describe("greater or equal", function() {
        mocha.it("strings", function() {
            const xval = "value1";
            const eobj = {key: xval};
            const gobj = {key: "value2"};
            const top = new TestOp({attr: "key", op: ">=", expect: xval});
            assert.ok(top.test(eobj, xval), "equal test value");
            assert.ok(top.test(gobj, xval), "greater test value");
            assert.strictEqual(top.description, `key >= ${xval}`, "description value");
        });
        mocha.it("numbers", function() {
            const xval = 1;
            const eobj = {key: xval};
            const gobj = {key: 2};
            const top = new TestOp({attr: "key", op: ">=", expect: xval});
            assert.ok(top.test(eobj, xval), "equal test value");
            assert.ok(top.test(gobj, xval), "greater test value");
            assert.strictEqual(top.description, `key >= ${xval}`, "description value");
        });
        mocha.it("dates", function() {
            const xval = new Date("2020-01-20T12:00:00Z");
            const eobj = {key: xval};
            const gobj = {key: new Date("2020-01-20T12:00:01Z")};
            const top = new TestOp({attr: "key", op: ">=", expect: xval});
            assert.ok(top.test(eobj, xval), "equal test value");
            assert.ok(top.test(gobj, xval), "greater test value");
            assert.strictEqual(top.description, `key >= ${xval}`, "description value");
        });
    });
    mocha.describe("lesser", function() {
        mocha.it("strings", function() {
            const xval = "value2";
            const obj = {key: "value1"};
            const top = new TestOp({attr: "key", op: "<", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key < ${xval}`, "description value");
        });
        mocha.it("numbers", function() {
            const xval = 2;
            const obj = {key: 1};
            const top = new TestOp({attr: "key", op: "<", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key < ${xval}`, "description value");
        });
        mocha.it("dates", function() {
            const xval = new Date("2020-01-20T12:00:01Z");
            const obj = {key: new Date("2020-01-20T12:00:00Z")};
            const top = new TestOp({attr: "key", op: "<", expect: xval});
            assert.ok(top.test(obj, xval), "test value");
            assert.strictEqual(top.description, `key < ${xval}`, "description value");
        });
    });
    mocha.describe("lesser or equal", function() {
        mocha.it("strings", function() {
            const xval = "value2";
            const eobj = {key: xval};
            const gobj = {key: "value1"};
            const top = new TestOp({attr: "key", op: "<=", expect: xval});
            assert.ok(top.test(eobj, xval), "equal test value");
            assert.ok(top.test(gobj, xval), "lesser test value");
            assert.strictEqual(top.description, `key <= ${xval}`, "description value");
        });
        mocha.it("numbers", function() {
            const xval = 2;
            const eobj = {key: xval};
            const gobj = {key: 1};
            const top = new TestOp({attr: "key", op: "<=", expect: xval});
            assert.ok(top.test(eobj, xval), "equal test value");
            assert.ok(top.test(gobj, xval), "lesser test value");
            assert.strictEqual(top.description, `key <= ${xval}`, "description value");
        });
        mocha.it("dates", function() {
            const xval = new Date("2020-01-20T12:00:01Z");
            const eobj = {key: xval};
            const gobj = {key: new Date("2020-01-20T12:00:00Z")};
            const top = new TestOp({attr: "key", op: "<=", expect: xval});
            assert.ok(top.test(eobj, xval), "equal test value");
            assert.ok(top.test(gobj, xval), "lesser test value");
            assert.strictEqual(top.description, `key <= ${xval}`, "description value");
        });
    });
    mocha.describe("undefined operator", function() {
        mocha.it("throws NotImplementedException", function() {
            assert.throws(
                () => {
                    new TestOp({attr: "key", op: "nosuch", expect: null})
                },
                new NotImplementedException("operator nosuch not known"));
        });
    });
});