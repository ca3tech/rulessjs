import { IModelDatum, IModelDescription, IModelNodeDef, IModelNodeOutput } from "./model/ModelContracts";
import { Pipeline } from "./model/Pipeline";
export { IModelDatum, IModelDescription, IModelNodeDef, IModelNodeOutput };
export declare class Model {
    private pipe;
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
    constructor(description: IModelDescription);
    /**
     * Apply the model to the observations
     *
     * @param data  The observational data
     * @returns  The input data possibly with model
     *           result attributes added
     */
    apply(data: IModelDatum[]): IModelDatum[];
    protected get pipeline(): Pipeline;
}
//# sourceMappingURL=index.d.ts.map