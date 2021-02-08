/**
 * This defines the contract for a test operator function
 */
export interface ITestFunction {
    (obj : any, attr : string, expect : TestValue) : boolean;
}

/**
 * This defines the contract of the definition
 * when creating a new TestOp object
 */
export interface ITestOpDef {
    attr : string;
    op : string;
    expect : any;
}

/**
 * This defines the types of values that can be
 * tested by a TestOp test function
 */
export type TestValue =
    | string
    | number
    | Date;

export interface ILogicalTestFunction {
    (results : boolean[]) : boolean
}