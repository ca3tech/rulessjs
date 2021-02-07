import {NotImplementedException} from "../exceptions/NotImplementedException";
import {ITestFunction, TestValue} from "./TestContracts";

export class TestFunctionFactory {
    private testFuns : any;

    constructor() {
        this.testFuns = {
            "=": equal,
            "!=": notequal,
            ">": greater,
            ">=": greaterOrEqual,
            "<": lesser,
            "<=": lesserOrEqual
        }
    }

    /**
     * Extend the set of known operators
     * 
     * @param operator  The new operator
     * @param fun  The test function to associate with operator
     */
    public addOperator(operator : string, fun : ITestFunction) {
        this.testFuns[operator] = fun;
    }

    /**
     * Get the test function for the given operator
     * 
     * @param operator  The operator
     * 
     * @returns  The test function for the operator
     */
    public getTestFunction(operator : string) : ITestFunction {
        if(this.testFuns[operator] !== undefined) {
            return this.testFuns[operator];
        }
        throw new NotImplementedException(`operator ${operator} not known`);
    }
}

function equal(obj : any, attr : string, expect : TestValue) : boolean {
    if(expect instanceof Date) {
        return obj[attr].getTime() == expect.getTime();
    }
    return obj[attr] == expect;
}

function notequal(obj : any, attr : string, expect : TestValue) : boolean {
    return ! equal(obj, attr, expect);
}

function greater(obj : any, attr : string, expect : TestValue) : boolean {
    if(expect instanceof Date) {
        return obj[attr].getTime() > expect.getTime();
    }
    return obj[attr] > expect;
}

function greaterOrEqual(obj : any, attr : string, expect : TestValue) : boolean {
    return greater(obj, attr, expect) || equal(obj, attr, expect);
}

function lesser(obj : any, attr : string, expect : TestValue) : boolean {
    return ! (greater(obj, attr, expect) || equal(obj, attr, expect));
}

function lesserOrEqual(obj : any, attr : string, expect : TestValue) : boolean {
    return lesser(obj, attr, expect) || equal(obj, attr, expect);
}