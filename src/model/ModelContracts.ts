export interface ITestOpExpect {
    attr : string;
    value : any;
}

export interface ITestOpDescription {
    [op : string] : ITestOpExpect;
}

export interface IOperatorDescription {
    [op : string] : ITestOpExpect | ITestOpDescription[];
}

export interface IPipelineNodeOutput {
    name? : string;
    value : string;
}

export interface IPipelineNodeDef {
    [op : string] : ITestOpExpect | ITestOpDescription[] | IPipelineNodeOutput;
    output : IPipelineNodeOutput;
}

export interface IPipelineNodeDescription {
    [name : string] : IPipelineNodeDef;
}