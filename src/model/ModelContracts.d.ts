export interface ITestOpExpect {
    attr: string;
    value: any;
}
export interface ITestOpDescription {
    [op: string]: ITestOpExpect;
}
export interface IOperatorDescription {
    [op: string]: ITestOpExpect | ITestOpDescription | ITestOpDescription[];
}
export interface IPipelineNodeOutput {
    name?: string;
    true: string;
    false?: string;
}
export interface IPipelineNodeDef {
    [op: string]: ITestOpExpect | ITestOpDescription | ITestOpDescription[] | IPipelineNodeOutput;
    output: IPipelineNodeOutput;
}
export interface IPipelineNodeDescription {
    [name: string]: IPipelineNodeDef;
}
/**
 * Defines the structure of a Model description
 *
 * @description
 * This interface defines the structure of the objects that
 * can be passed to the Model constructor. The attributes
 * of the object define the name of the step, and possibly
 * the output attribute, and the value of each is an object
 * that describes the test to perform on the data and the
 * value to assign to an output attribute if the test
 * evaluates to true. Each of these objects will have an
 * output attribute that defines the attribute and value
 * of that attribute to add to the data, and an attribute
 * that corresponds to the possible operators, e.g.
 * =, !=, and, or.
 *
 * @example
 * const def = {
 *   test1: {
 *     "=": {
 *       attr: "col1",
 *       value: 1
 *     },
 *     output: {
 *       name: "col1_is_1",
 *       true: "PASS",
 *       false: "FAIL"
 *     }
 *   },
 *   col2_is_2: {
 *     "=": {
 *       attr: "col2",
 *       value: 2
 *     },
 *     output: {
 *       true: "PASS",
 *       false: "FAIL"
 *     }
 *   },
 *   all_pass: {
 *     "and": [
 *       {
 *         "=": {
 *           attr: col1_is_1,
 *           value: "PASS"
 *         }
 *       },
 *       {
 *         "=": {
 *           attr: col2_is_2,
 *           value: "PASS"
 *         }
 *       }
 *     ],
 *     output: {
 *       true: "PASS",
 *       false: "FAIL"
 *     }
 *   }
 * }
 */
export { IPipelineNodeDescription as IModelDescription };
/**
 * Defines the structure of data to which model can be applied
 *
 * @description
 * This defines the structure of data to which model can be applied.
 * To put simply it is an object with key values that may be
 * string, number, Date or an array thereof.
 */
export { ITestDatum as IModelDatum } from "../operators/TestContracts";
//# sourceMappingURL=ModelContracts.d.ts.map