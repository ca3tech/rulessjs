import { IModelDatum, IPipelineNodeDescription } from "./ModelContracts";
import { PipelineNode } from "./PipelineNode";

export class Pipeline {
    private h : PipelineNode;
    private t : PipelineNode;

    /**
     * Create a new Pipeline from the given model
     * 
     * @param description  The model
     * @returns  A new Pipeline object
     * 
     * @example
     * const model = {
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
     * const pipe = new Pipeline(model);
     */
    constructor(description : IPipelineNodeDescription) {
        for(const name in description) {
            const ndesc : any = {};
            ndesc[name] = description[name];
            this.add(new PipelineNode(ndesc));
        }
    }

    /**
     * Extend the pipeline by appending a new node to the end
     * 
     * @param n  The PipelineNode to append
     */
    public add(n : PipelineNode) {
        if(this.t) {
            this.t.next = n;
        } else {
            this.h = n;
        }
        this.t = n;
    }

    /**
     * Get the PipelineNode at the beginning of the pipeline
     * 
     * @returns  The first PipelineNode
     */
    public get head() : PipelineNode {
        return this.h;
    }

    public apply(datum : IModelDatum) : IModelDatum {
        for(let node : PipelineNode = this.head; node !== undefined; node = node.next) {
            let v : any = node.output.false;
            if(node.operator.test(datum)) {
                v = node.output.true;
            }
            if(v !== undefined) {
                datum[node.output.name] = v;
            }
        }
        return datum;
    }
}