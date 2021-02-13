import { Operator } from "../operators/Operator";
import { IPipelineNodeDescription, IPipelineNodeOutput } from "./ModelContracts";
export declare class PipelineNode {
    private n;
    private op;
    private out;
    constructor(description: IPipelineNodeDescription);
    get operator(): Operator;
    get output(): IPipelineNodeOutput;
    set next(node: PipelineNode);
    get next(): PipelineNode;
}
//# sourceMappingURL=PipelineNode.d.ts.map