import { Operator } from "../operators/Operator";
import { IOperatorDescription, IPipelineNodeDescription, IPipelineNodeOutput } from "./ModelContracts";
import { OperatorFactory } from "./OperatorFactory";

export class PipelineNode {
    private n : PipelineNode;
    private op : Operator;
    private out : IPipelineNodeOutput;

    constructor(description : IPipelineNodeDescription) {
        const name = Object.keys(description)[0];
        const def = Object.assign({}, description[name]);
        this.out = def.output;
        if(this.out.name === undefined) {
            this.out.name = name;
        }
        delete def.output;
        const opfactory = new OperatorFactory();
        this.op = opfactory.getop(def as unknown as IOperatorDescription);
    }

    public get operator() : Operator {
        return this.op;
    }

    public get output() : IPipelineNodeOutput {
        return this.out;
    }

    public set next(node : PipelineNode) {
        this.n = node;
    }

    public get next() : PipelineNode {
        return this.n;
    }
}