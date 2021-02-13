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
const OperatorFactory_1 = require("../src/model/OperatorFactory");
const TestOp_1 = require("../src/operators/TestOp");
const LogicalOp_1 = require("../src/operators/LogicalOp");
const NotImplementedException_1 = require("../src/exceptions/NotImplementedException");
mocha.describe("OperatorFactory", function () {
    mocha.it("TestOp", function () {
        const desc = {
            "=": {
                attr: "col1",
                value: 1
            }
        };
        const factory = new OperatorFactory_1.OperatorFactory();
        const op = factory.getop(desc);
        assert.ok(op instanceof TestOp_1.TestOp, "operator type is TestOp");
        assert.strictEqual(op.description, "col1 = 1", "operator description value");
    });
    mocha.it("LogicalOp", function () {
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
        const factory = new OperatorFactory_1.OperatorFactory();
        const op = factory.getop(desc);
        assert.ok(op instanceof LogicalOp_1.LogicalOp, "operator type is LogicalOp");
        assert.strictEqual(op.description, "col1 = 1 or col2 = 2", "operator description value");
    });
    mocha.it("undefined op", function () {
        const desc = {
            "notdefined": {
                attr: "col1",
                value: 1
            }
        };
        const factory = new OperatorFactory_1.OperatorFactory();
        assert.throws(() => {
            factory.getop(desc);
        }, new NotImplementedException_1.NotImplementedException("operator notdefined not known"));
    });
});
