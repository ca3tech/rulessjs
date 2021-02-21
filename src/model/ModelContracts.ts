export interface ITestOpExpect {
    attr : string;
    value : any;
}

export interface ITestOpDescription {
    [op : string] : ITestOpExpect;
}

export interface IOperatorDescription {
    [op : string] : ITestOpExpect | ITestOpDescription | ITestOpDescription[];
}

/**
 * Describes the output to produce for a given node
 */
export interface IModelNodeOutput {
    /**
     * The optional name of the attribute to add to the data;
     * if not provided and a new value is to be added then
     * the name of the output attribute will be that which
     * was given for the parent object.
     */
    name? : string;

    /**
     * Defines the value to give to the output attribute
     * if the test evaluates to true
     */
    true : string;

    /**
     * Defines the value to give to the output attribute
     * if the test evaluates to false. This is optional
     * and if not defined nothing will be add to data.
     */
    false?: string;
}

/**
 * Defines the structure of a node in a Model
 * 
 * ### example 1
 * A test operator and all attributes specified for the output.
 * 
 * ```typescript
 * {
 *   "=": {
 *     attr: "col1",
 *     value: 1
 *   },
 *   output: {
 *     name: "col1_is_1",
 *     true: "PASS",
 *     false: "FAIL"
 *   }
 * }
 * ```
 * 
 * ### example 2
 * A test operator and only the true attribute specified for the output.
 * Without specifying the false attribute of output there will be nothing
 * added to the output if the test evaluates to false. Without specifying
 * the name attribute of output, if the test returns true then the
 * attribute added to the output will be the attribute that was given
 * for this object.
 * 
 * ```typescript
 * {
 *   "=": {
 *     attr: "col1",
 *     value: 1
 *   },
 *   output: {
 *     true: "PASS"
 *   }
 * }
 * ```
 * 
 * ### example 3
 * Use of the and logical operator. Note that the name
 * attribute is not specified for output; see example 2
 * for an explanation of behavior.
 * 
 * ```typescript
 * {
 *   "and": [
 *     {
 *       "=": {
 *         attr: col1_is_1,
 *         value: "PASS"
 *       }
 *     },
 *     {
 *       "=": {
 *         attr: col2_is_2,
 *         value: "PASS"
 *       }
 *     }
 *   ],
 *   output: {
 *     true: "PASS",
 *     false: "FAIL"
 *   }
 * }
 * ```
 */
export interface IModelNodeDef {
    /**
     * Defines the operator to apply to data. Currently
     * understood op values are:
     * 
     * Test Operators
     * + =
     *     + Test for equality
     * + !=
     *     + Test for inequality
     * + \>
     *     + Test for value being greater
     * + \>=
     *     + Test for value being greater or equal
     * + <
     *     + Test for value being lesser
     * + <=
     *     + Test for value being lesser or equal
     * 
     * Logical Operators
     * + and
     *     + Takes one or more Test Operators as value
     *     + Returns true if all Test Operators return true
     * + or
     *     + Takes one or more Test Operators as value
     *     + Returns true if any Test Operator returns true
     * 
     * Multivalue Test Operators
     * + all
     *     + Takes one of the Test Operators as value
     *     + Value under test is expected to be an array
     *     + Returns true if the test operator returns true for all values
     * + any
     *     + Takes one of the Test Operators as value
     *     + Value under test is expected to be an array
     *     + Returns true if the test operator returns true for any value
     */
    [op : string] : ITestOpExpect | ITestOpDescription | ITestOpDescription[] | IModelNodeOutput;

    /**
     * Defines the output to produce
     */
    output : IModelNodeOutput;
}

/**
 * Defines the structure of a Model description
 * 
 * ### description
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
 * ### example
 * ```typescript
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
 * ```
 */
export interface IModelDescription {
    [name : string] : IModelNodeDef;
}

export {ITestDatum as IModelDatum} from "../operators/TestContracts";