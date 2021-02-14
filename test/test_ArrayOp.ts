import * as mocha from "mocha";
import * as assert from "assert";
import { ArrayOp } from "../src/operators/ArrayOp";
import { NotImplementedException } from "../src/exceptions/NotImplementedException";
import { TestOp } from "../src/operators/TestOp";

mocha.describe("ArrayOp", function() {
    mocha.describe("all", function() {
        mocha.it("all tests true give true", function() {
            const xval = "value";
            const obj = {key: [xval, xval, xval]};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            const rop = new ArrayOp("all", top);
            assert.ok(rop.test(obj), "test value");
            assert.strictEqual(rop.description, `all(key = ${xval})`, "description value");
        });

        mocha.it("all tests not all true give false", function() {
            const xval = "value1";
            const obj = {key: [xval, "value2", xval]};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            const rop = new ArrayOp("all", top);
            assert.ok(! rop.test(obj), "test value");
            assert.strictEqual(rop.description, `all(key = ${xval})`, "description value");
        });
    });

    mocha.describe("any", function() {
        mocha.it("any tests all true give true", function() {
            const xval = "value";
            const obj = {key: [xval, xval, xval]};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            const rop = new ArrayOp("any", top);
            assert.ok(rop.test(obj), "test value");
            assert.strictEqual(rop.description, `any(key = ${xval})`, "description value");
        });

        mocha.it("any tests some true give true", function() {
            const xval = "value1";
            const obj = {key: [xval, "value2", xval]};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            const rop = new ArrayOp("any", top);
            assert.ok(rop.test(obj), "test value");
            assert.strictEqual(rop.description, `any(key = ${xval})`, "description value");
        });

        mocha.it("any tests none true give false", function() {
            const xval = "value1";
            const dval = "value2";
            const obj = {key: [dval, dval, dval]};
            const top = new TestOp({attr: "key", op: "=", expect: xval});
            const rop = new ArrayOp("any", top);
            assert.ok(! rop.test(obj), "test value");
            assert.strictEqual(rop.description, `any(key = ${xval})`, "description value");
        });
    });

    mocha.describe("undefined operator", function() {
        mocha.it("throws NotImplementedException", function() {
            const k1val = "value1";
            assert.throws(
                () => {
                    new ArrayOp("nosuch", new TestOp({attr: "k1", op: "=", expect: k1val}));
                },
                new NotImplementedException("operator nosuch not known"));
        });
    });
});