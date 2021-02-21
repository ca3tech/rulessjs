/**
 * This defines the contract for a test operator function
 */
export interface ITestFunction {
    (obj: any, attr: string, expect: TestValue): boolean;
}
/**
 * This defines the contract of the definition
 * when creating a new TestOp object
 */
export interface ITestOpDef {
    attr: string;
    op: string;
    expect: any;
}
/**
 * This defines the types of values that can be
 * tested by a TestOp test function
 */
export declare type TestValue = string | number | Date;
export interface ILogicalTestFunction {
    (results: boolean[]): boolean;
}
export { ILogicalTestFunction as IArrayTestFunction };
/**
 * Defines the structure of data to which model can be applied
 *
 * @description
 * This defines the structure of data to which model can be applied.
 * To put simply it is an object with key values that may be
 * string, number, Date or an array thereof.
 */
export interface ITestDatum {
    [attr: string]: string | string[] | number | number[] | Date | Date[];
}
//# sourceMappingURL=TestContracts.d.ts.map