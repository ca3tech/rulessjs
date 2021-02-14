import { ITestDatum } from "./TestContracts";

export abstract class Operator {
    /**
     * The operation definition as a string
     * 
     * @returns  The description
     */
    public abstract get description() : string;

    /**
     * Evaluate whether data point matches expectation
     * 
     * @param datum  The data object to test
     * 
     * @returns  True if the datapoint matches expectation and false if not
     */
    public abstract test(datum : ITestDatum) : boolean;
}