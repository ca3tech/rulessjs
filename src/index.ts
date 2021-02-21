import { IModelDatum, IModelDescription } from "./model/ModelContracts";
import { Pipeline } from "./model/Pipeline";

export { IModelDatum, IModelDescription };

export class Model {
    private pipe : Pipeline;

    /**
     * Create a new Model from the given definition
     * 
     * @param description  The definition
     * @returns  A new Model object
     * 
     * @example
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
    constructor(description : IModelDescription) {
        this.pipe = new Pipeline(description);
    }

    /**
     * Apply the model to the observations
     * 
     * @param data  The observational data
     * @returns  The input data possibly with model
     *           result attributes added
     */
    public apply(data : IModelDatum[]) : IModelDatum[] {
        return data.map((datum : IModelDatum) => {
            return this.pipeline.apply(datum);
        });
    }

    protected get pipeline() : Pipeline {
        return this.pipe;
    }
}
