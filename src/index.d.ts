import { IModelDescription } from "./model/ModelContracts";
import { Pipeline } from "./model/Pipeline";
export { IModelDescription };
export declare class Model {
    private pipe;
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
    constructor(description: IModelDescription);
    protected get pipeline(): Pipeline;
}
//# sourceMappingURL=index.d.ts.map