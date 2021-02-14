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
const index_1 = require("../src/index");
const TestOp_1 = require("../src/operators/TestOp");
const LogicalOp_1 = require("../src/operators/LogicalOp");
const ArrayOp_1 = require("../src/operators/ArrayOp");
mocha.describe("Model", function () {
    mocha.describe("construction", function () {
        mocha.it("one TestOp node", function () {
            const desc = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp_1.TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });
        mocha.it("one TestOp node explicit output name", function () {
            const desc = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        name: "condition1_result",
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp_1.TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1_result", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });
        mocha.it("two TestOp nodes", function () {
            const desc = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        value: "PASS"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: 2
                    },
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp_1.TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof TestOp_1.TestOp, "node 2 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col2 = 2", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });
        mocha.it("one LogicalOp node", function () {
            const desc = {
                condition1: {
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
                    ],
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof LogicalOp_1.LogicalOp, "node 1 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1 or col2 = 2", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });
        mocha.it("two LogicalOp node", function () {
            const desc = {
                condition1: {
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
                    ],
                    output: {
                        value: "PASS"
                    }
                },
                condition2: {
                    "and": [
                        {
                            "=": {
                                attr: "condition1",
                                value: "PASS"
                            }
                        },
                        {
                            "=": {
                                attr: "col3",
                                value: 3
                            }
                        }
                    ],
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof LogicalOp_1.LogicalOp, "node 1 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1 or col2 = 2", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof LogicalOp_1.LogicalOp, "node 2 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "condition1 = PASS and col3 = 3", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });
        mocha.it("one TestOp one LogicalOp node", function () {
            const desc = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        value: "PASS"
                    }
                },
                condition2: {
                    "and": [
                        {
                            "=": {
                                attr: "condition1",
                                value: "PASS"
                            }
                        },
                        {
                            "=": {
                                attr: "col3",
                                value: 3
                            }
                        }
                    ],
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp_1.TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof LogicalOp_1.LogicalOp, "node 2 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "condition1 = PASS and col3 = 3", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });
        mocha.it("one ArrayOp node", function () {
            const desc = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof ArrayOp_1.ArrayOp, "node 1 operator is ArrayOp");
            assert.strictEqual(pnode.operator.description, "all(col1 = 1)", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });
        mocha.it("two ArrayOp nodes", function () {
            const desc = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        value: "PASS"
                    }
                },
                condition2: {
                    "any": {
                        "=": {
                            attr: "col2",
                            value: 2
                        }
                    },
                    output: {
                        value: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof ArrayOp_1.ArrayOp, "node 1 operator is ArrayOp");
            assert.strictEqual(pnode.operator.description, "all(col1 = 1)", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof ArrayOp_1.ArrayOp, "node 2 operator is ArrayOp");
            assert.strictEqual(pnode.operator.description, "any(col2 = 2)", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });
    });
});
class MyModel extends index_1.Model {
    get pipeline() {
        return super.pipeline;
    }
}
