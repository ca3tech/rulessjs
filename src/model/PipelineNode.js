"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineNode = void 0;
const OperatorFactory_1 = require("./OperatorFactory");
class PipelineNode {
    constructor(description) {
        const name = Object.keys(description)[0];
        const def = Object.assign({}, description[name]);
        this.out = def.output;
        if (this.out.name === undefined) {
            this.out.name = name;
        }
        delete def.output;
        const opfactory = new OperatorFactory_1.OperatorFactory();
        this.op = opfactory.getop(def);
    }
    get operator() {
        return this.op;
    }
    get output() {
        return this.out;
    }
    set next(node) {
        this.n = node;
    }
    get next() {
        return this.n;
    }
}
exports.PipelineNode = PipelineNode;
