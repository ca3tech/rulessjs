import { Operator } from "../operators/Operator";
import { IModelDescription, IModelNodeOutput } from "./ModelContracts";
export declare class PipelineNode {
    private n;
    private op;
    private out;
    constructor(description: IModelDescription);
    get operator(): Operator;
    get output(): IModelNodeOutput;
    set next(node: PipelineNode);
    get next(): PipelineNode;
}
//# sourceMappingURL=PipelineNode.d.ts.map