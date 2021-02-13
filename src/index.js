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
     * @example
     * const def = {
     *   condition1: {
     *     "=": {
     *       attr: "col1",
     *       value: 1
     *     },
     *     output: {
     *        value: "PASS"
     *     }
     *   },
     *   condition2: {
     *     "=": {
     *       attr: "col2",
     *       value: 1
     *     },
     *     output: {
     *        name: "newattr",
     *        value: "PASS"
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
     *       value: "PASS"
     *     }
     *   }
     * };
     * const model = new Model(def);
     */
    constructor(description) {
        this.pipe = new Pipeline_1.Pipeline(description);
    }
    get pipeline() {
        return this.pipe;
    }
}
exports.Model = Model;
