import { IModelDatum, IPipelineNodeDescription } from "./ModelContracts";
import { PipelineNode } from "./PipelineNode";
export declare class Pipeline {
    private h;
    private t;
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
    constructor(description: IPipelineNodeDescription);
    /**
     * Extend the pipeline by appending a new node to the end
     *
     * @param n  The PipelineNode to append
     */
    add(n: PipelineNode): void;
    /**
     * Get the PipelineNode at the beginning of the pipeline
     *
     * @returns  The first PipelineNode
     */
    get head(): PipelineNode;
    apply(datum: IModelDatum): IModelDatum;
}
//# sourceMappingURL=Pipeline.d.ts.map