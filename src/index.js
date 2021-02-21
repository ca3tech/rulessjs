"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const Pipeline_1 = require("./model/Pipeline");
class Model {
    /**
     * Create a new Model from the given definition
     *
     * @param description  The definition
     * @returns  A new Model object
     *
     * ### example
     * ```typescript
     * const def = {
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
     * const model = new Model(def);
     * ```
     */
    constructor(description) {
        this.pipe = new Pipeline_1.Pipeline(description);
    }
    /**
     * Apply the model to the observations
     *
     * @param data  The observational data
     * @returns  The input data possibly with model
     *           result attributes added
     */
    apply(data) {
        return data.map((datum) => {
            return this.pipeline.apply(datum);
        });
    }
    get pipeline() {
        return this.pipe;
    }
}
exports.Model = Model;
