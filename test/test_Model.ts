import * as mocha from "mocha";
import * as assert from "assert";
import { Model } from "../src/index";
import { TestOp } from "../src/operators/TestOp";
import { Pipeline } from "../src/model/Pipeline";
import { IPipelineNodeDescription } from "../src/model/ModelContracts";
import { LogicalOp } from "../src/operators/LogicalOp";

mocha.describe("Model", function() {
    mocha.describe("construction", function() {
        mocha.it("one TestOp node", function() {
            const desc : IPipelineNodeDescription = {
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
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });

        mocha.it("one TestOp node explicit output name", function() {
            const desc : IPipelineNodeDescription = {
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
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1_result", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });

        mocha.it("two TestOp nodes", function() {
            const desc : IPipelineNodeDescription = {
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
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof TestOp, "node 2 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col2 = 2", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });

        mocha.it("one LogicalOp node", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "or" : [
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
            assert.ok(pnode.operator instanceof LogicalOp, "node 1 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1 or col2 = 2", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });

        mocha.it("two LogicalOp node", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "or" : [
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
                    "and" : [
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
            assert.ok(pnode.operator instanceof LogicalOp, "node 1 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1 or col2 = 2", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof LogicalOp, "node 2 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "condition1 = PASS and col3 = 3", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });

        mocha.it("one TestOp one LogicalOp node", function() {
            const desc : IPipelineNodeDescription = {
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
                    "and" : [
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
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof LogicalOp, "node 2 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "condition1 = PASS and col3 = 3", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.value, "PASS", "output.value");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });
    });
});

class MyModel extends Model {
    public get pipeline() : Pipeline {
        return super.pipeline;
    }
}