import { ITestDatum } from "./TestContracts";
export declare abstract class Operator {
    /**
     * The operation definition as a string
     *
     * @returns  The description
     */
    abstract get description(): string;
    /**
     * Evaluate whether data point matches expectation
     *
     * @param datum  The data object to test
     *
     * @returns  True if the datapoint matches expectation and false if not
     */
    abstract test(datum: ITestDatum): boolean;
}
//# sourceMappingURL=Operator.d.ts.map