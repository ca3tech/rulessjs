"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
const PipelineNode_1 = require("./PipelineNode");
class Pipeline {
    /**
     * Create a new Pipeline from the given model
     *
     * @param description  The model
     * @returns  A new Pipeline object
     *
     * @example
     * ```typescript
     * const model = {
     *   condition1: {
     *     "=": {
     *       attr: "col1",
     *       value: 1
     *     },
     *     output: {
     *        true: "PASS",
     *        false: "FAIL"
     *     }
     *   },
     *   condition2: {
     *     "=": {
     *       attr: "col2",
     *       value: 1
     *     },
     *     output: {
     *        name: "newattr",
     *        true: "PASS",
     *        false: "FAIL"
     *     }
     *   },
     *   condition3: {
     *     "and" : [
     *       {
     *         "=": {
     *           attr: "condition1",
     *           value: "PASS"
     *         }
     *       },
     *       {
     *         "=": {
     *           attr: "newattr",
     *           value: "PASS"
     *         }
     *       }
     *     ],
     *     output: {
     *       true: "PASS",
     *       false: "FAIL"
     *     }
     *   }
     * };
     * const pipe = new Pipeline(model);
     * ```
     */
    constructor(description) {
        for (const name in description) {
            const ndesc = {};
            ndesc[name] = description[name];
            this.add(new PipelineNode_1.PipelineNode(ndesc));
        }
    }
    /**
     * Extend the pipeline by appending a new node to the end
     *
     * @param n  The PipelineNode to append
     */
    add(n) {
        if (this.t) {
            this.t.next = n;
        }
        else {
            this.h = n;
        }
        this.t = n;
    }
    /**
     * Get the PipelineNode at the beginning of the pipeline
     *
     * @returns  The first PipelineNode
     */
    get head() {
        return this.h;
    }
    apply(datum) {
        for (let node = this.head; node !== undefined; node = node.next) {
            let v = node.output.false;
            if (node.operator.test(datum)) {
                v = node.output.true;
            }
            if (v !== undefined) {
                datum[node.output.name] = v;
            }
        }
        return datum;
    }
}
exports.Pipeline = Pipeline;
