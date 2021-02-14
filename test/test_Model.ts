import * as mocha from "mocha";
import * as assert from "assert";
import { Model } from "../src/index";
import { TestOp } from "../src/operators/TestOp";
import { Pipeline } from "../src/model/Pipeline";
import { IPipelineNodeDescription } from "../src/model/ModelContracts";
import { LogicalOp } from "../src/operators/LogicalOp";
import { ArrayOp } from "../src/operators/ArrayOp";

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
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
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
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1_result", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
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
                        true: "PASS"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: 2
                    },
                    output: {
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof TestOp, "node 2 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col2 = 2", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
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
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof LogicalOp, "node 1 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1 or col2 = 2", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
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
                        true: "PASS"
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
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof LogicalOp, "node 1 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1 or col2 = 2", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof LogicalOp, "node 2 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "condition1 = PASS and col3 = 3", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
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
                        true: "PASS"
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
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof TestOp, "node 1 operator is TestOp");
            assert.strictEqual(pnode.operator.description, "col1 = 1", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof LogicalOp, "node 2 operator is LogicalOp");
            assert.strictEqual(pnode.operator.description, "condition1 = PASS and col3 = 3", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });

        mocha.it("one ArrayOp node", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof ArrayOp, "node 1 operator is ArrayOp");
            assert.strictEqual(pnode.operator.description, "all(col1 = 1)", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.strictEqual(pnode.next, undefined, "node 1 next is undefined");
        });

        mocha.it("two ArrayOp nodes", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        true: "PASS"
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
                        true: "PASS"
                    }
                }
            };
            const mod = new MyModel(desc);
            const pipe = mod.pipeline;
            let pnode = pipe.head;
            assert.ok(pnode.operator instanceof ArrayOp, "node 1 operator is ArrayOp");
            assert.strictEqual(pnode.operator.description, "all(col1 = 1)", "node 1 operator description");
            assert.strictEqual(pnode.output.name, "condition1", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.notStrictEqual(pnode.next, undefined, "node 1 next is not undefined");
            pnode = pnode.next;
            assert.ok(pnode.operator instanceof ArrayOp, "node 2 operator is ArrayOp");
            assert.strictEqual(pnode.operator.description, "any(col2 = 2)", "node 2 operator description");
            assert.strictEqual(pnode.output.name, "condition2", "output.name");
            assert.strictEqual(pnode.output.true, "PASS", "output.true");
            assert.strictEqual(pnode.next, undefined, "node 2 next is undefined");
        });
    });

    mocha.describe("apply", function() {
        mocha.it("one item, one number equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });
        
        mocha.it("one item, one number not equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "!=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 2, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });

        mocha.it("one item, one number greater test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    ">": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 2, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });
        
        mocha.it("one item, one number greater or equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    ">=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });

        mocha.it("one item, one number lesser test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "<": {
                        attr: "col1",
                        value: 2
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });

        mocha.it("one item, one number lesser or equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "<=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });

        mocha.it("two items, one number equal test, both PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"},
                {col1: 1, col2: "b"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            for(let i = 0; i < rslt.length; i++) {
                assert.ok(rslt[i].condition1 !== undefined, `[${i}] condition1 was added to output`);
                assert.strictEqual(rslt[i]["condition1"], "PASS", `[${i}] condition1 value`);
            }
        });

        mocha.it("one item, one number equal test, FAIL", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 2, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "FAIL", "condition1 value");
        });

        mocha.it("two items, one number equal test, one PASS, one FAIL", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"},
                {col1: 2, col2: "b"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            const xvals = ["PASS", "FAIL"];
            for(let i = 0; i < rslt.length; i++) {
                assert.ok(rslt[i].condition1 !== undefined, `[${i}] condition1 was added to output`);
                assert.strictEqual(rslt[i]["condition1"], xvals[i], `[${i}] condition1 value`);
            }
        });

        mocha.it("one item, two equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: "a"
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
            assert.ok(rslt[0].condition2 !== undefined, "condition2 was added to output");
            assert.strictEqual(rslt[0]["condition2"], "PASS", "condition2 value");
        });

        mocha.it("one item, one equal PASS, one equal FAIL", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: "b"
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
            assert.ok(rslt[0].condition2 !== undefined, "condition2 was added to output");
            assert.strictEqual(rslt[0]["condition2"], "FAIL", "condition2 value");
        });

        mocha.it("one item, one array number equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: [1, 1, 1], col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
        });

        mocha.it("two item, one array number equal test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: [1, 1, 1], col2: "a"},
                {col1: [1, 1, 1], col2: "b"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            const xvals = ["PASS", "PASS"];
            for(let i = 0; i < rslt.length; i++) {
                assert.ok(rslt[i].condition1 !== undefined, `[${i}] condition1 was added to output`);
                assert.strictEqual(rslt[i]["condition1"], xvals[i], `[${i}] condition1 value`);
            }
        });

        mocha.it("one item, one array number equal test, FAIL", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: [1, 2, 1], col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "FAIL", "condition1 value");
        });

        mocha.it("two item, one array number equal test, one PASS, one FAIL", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "all": {
                        "=": {
                            attr: "col1",
                            value: 1
                        }
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: [1, 1, 1], col2: "a"},
                {col1: [1, 2, 1], col2: "b"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            const xvals = ["PASS", "FAIL"];
            for(let i = 0; i < rslt.length; i++) {
                assert.ok(rslt[i].condition1 !== undefined, `[${i}] condition1 was added to output`);
                assert.strictEqual(rslt[i]["condition1"], xvals[i], `[${i}] condition1 value`);
            }
        });

        mocha.it("one item, two equal test, one and test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: "a"
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                label: {
                    and: [
                        {
                            "=": {
                                attr: "condition1",
                                value: "PASS"
                            }
                        },
                        {
                            "=": {
                                attr: "condition2",
                                value: "PASS"
                            }
                        }
                    ],
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
            assert.ok(rslt[0].condition2 !== undefined, "condition2 was added to output");
            assert.strictEqual(rslt[0]["condition2"], "PASS", "condition2 value");
            assert.ok(rslt[0].label !== undefined, "label was added to output");
            assert.strictEqual(rslt[0]["label"], "PASS", "label value");
        });

        mocha.it("one item, two equal test, one or test, PASS", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: "b"
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                label: {
                    or: [
                        {
                            "=": {
                                attr: "condition1",
                                value: "PASS"
                            }
                        },
                        {
                            "=": {
                                attr: "condition2",
                                value: "PASS"
                            }
                        }
                    ],
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
            assert.ok(rslt[0].condition2 !== undefined, "condition2 was added to output");
            assert.strictEqual(rslt[0]["condition2"], "FAIL", "condition2 value");
            assert.ok(rslt[0].label !== undefined, "label was added to output");
            assert.strictEqual(rslt[0]["label"], "PASS", "label value");
        });

        mocha.it("one item, one equal test PASS, one equal test FAIL, one logical test FAIL", function() {
            const desc : IPipelineNodeDescription = {
                condition1: {
                    "=": {
                        attr: "col1",
                        value: 1
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                condition2: {
                    "=": {
                        attr: "col2",
                        value: "b"
                    },
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                },
                label: {
                    and: [
                        {
                            "=": {
                                attr: "condition1",
                                value: "PASS"
                            }
                        },
                        {
                            "=": {
                                attr: "condition2",
                                value: "PASS"
                            }
                        }
                    ],
                    output: {
                        true: "PASS",
                        false: "FAIL"
                    }
                }
            };
            const data = [
                {col1: 1, col2: "a"}
            ];
            const mod = new Model(desc);
            const rslt = mod.apply(data);
            assert.strictEqual(rslt.length, data.length, "number of result records");
            assert.ok(rslt[0].condition1 !== undefined, "condition1 was added to output");
            assert.strictEqual(rslt[0]["condition1"], "PASS", "condition1 value");
            assert.ok(rslt[0].condition2 !== undefined, "condition2 was added to output");
            assert.strictEqual(rslt[0]["condition2"], "FAIL", "condition2 value");
            assert.ok(rslt[0].label !== undefined, "label was added to output");
            assert.strictEqual(rslt[0]["label"], "FAIL", "label value");
        });
    });
});

class MyModel extends Model {
    public get pipeline() : Pipeline {
        return super.pipeline;
    }
}